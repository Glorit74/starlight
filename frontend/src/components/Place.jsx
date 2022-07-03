import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import {
  TableCell,
  TableRow,
  tableCellClasses,
  TextField,
  ButtonGroup,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Selection from "../api/Selection";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function Place({ place, pfId }) {
  const { post } = toDoApi();
  const [isUpdate, setIsUpdate] = useState(true);
  const [newVenue, setNewVenue] = useState({
    place: place.place,
    date: place.date,
    time: place.time,
  });
  const [selected, setSelected] = useState(newVenue.place);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNewVenue((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };
  const updatePlace = async () => {
    setIsUpdate(!isUpdate);
  };

  const savePlace = async () => {
    console.log(newVenue, selected);
    const responseSave = await post("performance/venue/modify", {
      venueId: place._id,
      place: selected,
      date: newVenue.date,
      time: newVenue.time,
    });
    // if (responseSave?.status === 400) {
    //   setMessage(responseSave.statusText);
    // } else {
    setIsUpdate(true);
    console.log("save", responseSave);
    // }
  };

  const deleteVenue = async () => {
    const responseDelete = await post("performance/venue/delete", {
      performanceId: pfId,
      venueId: place._id,
    });
    setIsUpdate(true);
  };

  useEffect(() => {}, [isUpdate]);
  return (
    <>
      {isUpdate ? (
        <StyledTableRow
          key={place._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>{selected}</StyledTableCell>
          <StyledTableCell>{newVenue.date}</StyledTableCell>
          <StyledTableCell>{newVenue.time}</StyledTableCell>
          <StyledTableCell>
            <ButtonGroup>
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={updatePlace}
              >
                Módosítás
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={deleteVenue}
              >
                Törlés
              </Button>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        <StyledTableRow
          key={place._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>
            <Selection
              size="small"
              endpoint="place"
              defaultSelection={newVenue.place}
              selected={selected}
              setSelected={setSelected}
            />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="date"
              type="date"
              value={newVenue.date}
              onChange={handleChange}
            />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="time"
              type="time"
              value={newVenue.time}
              onChange={handleChange}
            />
          </StyledTableCell>

          <StyledTableCell>
            <ButtonGroup>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={savePlace}
              >
                Mentés
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={updatePlace}
              >
                Mégsem
              </Button>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>
  );
}

export default Place;

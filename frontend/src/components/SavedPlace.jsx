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

function SavedPlace({ placeId, isAdd, setIsAdd }) {
  const { post, get } = toDoApi();
  const [isUpdate, setIsUpdate] = useState(true);
  const [myPlace, setMyPlace] = useState([]);
  const [newPlace, setNewPlace] = useState({
    id: "",
    place: "",
    shortName: "",
    city: myPlace.city,
    mobile: "",
  });
  const [selected, setSelected] = useState("");
  const [message, setMessage] = useState("");

  //   const handleChange = (e) => {
  //     setNewPlace((prevText) => {
  //       return { ...prevText, [e.target.name]: e.target.value };
  //     });
  //   };

  const handleChange = (e) => {
    let updatedValue = { [e.target.name]: e.target.value };
    setNewPlace((newPlace) => ({
      ...newPlace,
      ...updatedValue,
    }));
  };

  const getPlace = async () => {
    const responsePlaces = await get("/place");

    if (responsePlaces.status === 200) {
      const filteredPlace = responsePlaces.data.filter(
        (place) => place._id === placeId
      );
      if (filteredPlace[0]) {
        setMyPlace(filteredPlace[0]);
        // let updatedValue = {};
        // updatedValue = { id: filteredPlace[0]._id };
        // setNewPlace((newPlace) => ({
        //   ...newPlace,
        //   ...updatedValue,
        // }));
      }
    }
  };
  const updatePlace = async () => {
    setIsUpdate(!isUpdate);
    console.log(placeId);
  };
  const savePlace = async () => {
    console.log(placeId);
  };

  const deletePlace = async () => {
    const responseDelete = await post("/place/delete", {
      id: placeId,
    });
    console.log(responseDelete);
  };

  useEffect(() => {
    getPlace();

    // eslint-disable-next-line
  }, [isUpdate, isAdd]);

  return (
    <>
      {isUpdate ? (
        <StyledTableRow
          key={placeId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>{myPlace?.name}</StyledTableCell>
          <StyledTableCell>{myPlace?.address?.city}</StyledTableCell>
          <StyledTableCell>{myPlace?.mobile}</StyledTableCell>
          <StyledTableCell>
            <ButtonGroup>
              <Button onClick={(e) => console.log(myPlace)}>GET</Button>
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
                onClick={deletePlace}
              >
                Törlés
              </Button>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        <StyledTableRow
          key={placeId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="name"
              value={newPlace.name}
              onChange={handleChange}
            />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="city"
              value={newPlace.city}
              onChange={handleChange}
            />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              type="mobile"
              value={newPlace.mobile}
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

export default SavedPlace;

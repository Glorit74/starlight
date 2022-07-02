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

function Award({ title, year, awardId }) {
  const { post } = toDoApi();
  const [isUpdate, setIsUpdate] = useState(true);
  const [newAward, setNewAward] = useState({
    title: title,
    year: year,
  });
  const [myAwardId, setmyAwardId] = useState(awardId);

  const handleChange = (e) => {
    setNewAward((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };
  const updateAward = async () => {
    setIsUpdate(!isUpdate);
  };

  const saveAward = async () => {
    const responseSave = await post("actor/awards/modify", {
      awardId: awardId,
      title: newAward.title,
      year: newAward.year,
    });
    console.log("save", responseSave);
    // if (responseSave?.status === 400) {
    //   setMessage(responseSave.statusText);
    // } else {
    // setIsUpdate(true);
    // }
  };

  const deleteAward = async () => {
    console.log("delete st", awardId);
    const responseDelete = await post(
      `actor/awards/delete/?awardId=${awardId}`
    );
    console.log("delete", responseDelete);
  };

  useEffect(() => {}, [myAwardId]);

  return (
    <>
      {isUpdate ? (
        <StyledTableRow
          key={awardId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>{newAward.title}</StyledTableCell>
          <StyledTableCell>{newAward.year}</StyledTableCell>
          <StyledTableCell>
            <ButtonGroup>
              <Button
                size="small"
                variant="contained"
                color="warning"
                onClick={updateAward}
              >
                Módosítás
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={deleteAward}
              >
                Törlés
              </Button>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      ) : (
        <StyledTableRow
          key={awardId}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="title"
              value={newAward.title}
              onChange={handleChange}
            />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="year"
              value={newAward.year}
              onChange={handleChange}
            />
          </StyledTableCell>

          <StyledTableCell>
            <ButtonGroup>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={saveAward}
              >
                Mentés
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={updateAward}
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

export default Award;

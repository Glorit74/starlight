import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SavedPlace from "./SavedPlace";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
}));

function Places({ isAdd }) {
  const { get } = toDoApi();
  const [places, setPlaces] = useState([]);

  const getPlace = async () => {
    const responsePlaces = await get("/place");
    if (responsePlaces?.data) setPlaces(responsePlaces.data);
  };

  useEffect(() => {
    getPlace();
    // eslint-disable-next-line
  }, [isAdd]);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "80%", m: "auto" }}
      aria-label="Place table"
    >
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Elnevezés</StyledTableCell>
            <StyledTableCell>Cím</StyledTableCell>
            <StyledTableCell colSpan={2}>Mobil</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {places.map((place) => (
            <SavedPlace key={place._id} placeId={place._id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Places;

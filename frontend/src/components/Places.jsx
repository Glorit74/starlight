import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { toDoApi } from "../api/toDoApi";
import {
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
import Place from "./Place";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
}));

function Places({ isAdd, title, place, date, time }) {
  const { token, user } = useAuth();
  const { get, post } = toDoApi();
  const [places, setPlaces] = useState([]);
  const [placeId, setPlaceId] = useState("");

  const getPlace = async () => {
    const responsePLaces = await get("/performance");
    const filteredPlace = await responsePLaces.data.filter(
      (p) => p.title === title
    );
    // console.log(filteredPlace[0]?.venue, "venue");
    if (filteredPlace[0]?.venue) {
      setPlaces(filteredPlace[0].venue);
    }
  };

  useEffect(() => {
    getPlace();
    // console.log(places);
    // eslint-disable-next-line
  }, [places, date, time, isAdd]);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "80%" }}
      aria-label="Venues table"
    >
      <Table>
        {/* <caption>
            Összefoglaló a színházi előadások helyszíneiről és időpontjairól
          </caption> */}

        <TableHead>
          <TableRow>
            <StyledTableCell>Helyszín</StyledTableCell>
            <StyledTableCell>Dátum</StyledTableCell>
            <StyledTableCell colSpan={2}>Időpont</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {places.map((place) => (
            <Place key={place._id} place={place} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Places;

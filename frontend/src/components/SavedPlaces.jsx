import React, { useState, useEffect } from "react";
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
  const { get } = toDoApi();
  const [places, setPlaces] = useState([]);
  const [pfId, setPfId] = useState("");

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    const filteredPf = await responsePf.data.filter((pf) => pf.title === title);
    if (filteredPf[0]?.venue) {
      setPfId(filteredPf[0]._id);
    }
  };

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
    getPerformance();
    getPlace();
    // console.log(title);
    // eslint-disable-next-line
  }, [place, title, date, time, isAdd]);

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
            <SavedPlace key={place._id} place={place} pfId={pfId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Places;

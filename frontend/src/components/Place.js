import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
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

function Place({ place }) {
  return (
    <StyledTableRow
      key={place._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <StyledTableCell>{place.place}</StyledTableCell>
      <StyledTableCell>{place.date}</StyledTableCell>
      <StyledTableCell>{place.time}</StyledTableCell>
      <StyledTableCell>
        <ButtonGroup>
          <Button size="small" variant="contained" color="warning">
            Módosítás
          </Button>
          <Button size="small" variant="contained" color="error">
            Törlés
          </Button>
        </ButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  );
}

export default Place;

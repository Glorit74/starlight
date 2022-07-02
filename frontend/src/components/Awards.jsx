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
import Award from "./Award";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
}));

function Awards({ name, id }) {
  const { get } = toDoApi();
  const [awards, setAwards] = useState([]);

  const getActor = async () => {
    const responseActor = await get("/actor");
    // console.log(responseActor, id, name);
    const filteredActor = await responseActor?.data.filter(
      (actor) => actor._id === id
    );
    setAwards(filteredActor[0].awards);
  };

  useEffect(() => {
    getActor();
    // console.log(awards.length, "hossz");
    // eslint-disable-next-line
  }, [id, awards]);

  return (
    <div>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "80%" }}
        aria-label="Venues table"
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Díj megnevezése</StyledTableCell>
              <StyledTableCell colSpan={2}>Átadás éve</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {awards.map((a) => (
              <Award
                key={a._id}
                title={a.title}
                year={a.year}
                awardId={a._id}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Awards;

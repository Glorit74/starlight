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
    backgroundColor: theme.palette.common.gray,
    color: theme.palette.common.white,
    fontSize: 16,
  },
}));

function Awards({ name }) {
  const { get } = toDoApi();
  const [awards, setAwards] = useState([]);
  const [actorId, setActorId] = useState("");

  const getActor = async () => {
    console.log("getActor starts");
    const responseActor = await get("/actor");
    const filteredActor = await responseActor.data.filter(
      (actor) => actor.name === name
    );
    if (filteredActor) {
      setActorId(filteredActor[0]._id);
      setAwards(filteredActor[0].awards);
    }
  };

  useEffect(() => {
    getActor();

    // eslint-disable-next-line
  }, [name]);

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
            {/* {awards.map((a) => (
              <Award
                key={a._id}
                title={a.title}
                year={a.year}
                awardsId={a._id}
              />
            ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Awards;

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
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import Role from "./Role";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 16,
  },
}));

function Roles({ title }) {
  const { get } = toDoApi();
  const [roles, setRoles] = useState([]);

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    const filteredPf = await responsePf?.data.filter(
      (pf) => pf.title === title
    );
    if (filteredPf[0]) {
      setRoles(filteredPf[0].actor);
    }
  };

  useEffect(() => {
    getPerformance();

    // eslint-disable-next-line
  }, [title]);
  return (
    <>
      <Button onClick={(e) => console.log("params", title, roles)}>
        Roles
      </Button>
      {title.length ? (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "80%" }}
          aria-label="Venues table"
        >
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Színdarab</StyledTableCell>
                <StyledTableCell colSpan={2}>Szerep</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((role) => (
                <Role key={role._id} role={role} title={title} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <></>
      )}
    </>
  );
}

export default Roles;

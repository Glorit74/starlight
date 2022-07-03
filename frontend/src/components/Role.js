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

function Role({ role, title }) {
  const { post } = toDoApi();
  const [isUpdate, setIsUpdate] = useState(true);
  const [newRole, setNewRole] = useState({
    name: role.name,
    role: role.role,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setNewRole((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };

  const updateRole = async () => {
    setIsUpdate(!isUpdate);
  };

  const saveRole = async () => {
    setMessage("");
    const responseSave = await post("/performance/actor/modify", {
      id: role._id,
      name: newRole.name,
      role: newRole.role,
    });
    if (responseSave?.status === 400) {
      setMessage(responseSave.data);
    }
    setIsUpdate(!isUpdate);
  };

  const deleteRole = async () => {
    const responseDelete = await post(
      `performance/role/delete/?id=${role._id}&title=${title}`
    );
    console.log(responseDelete?.data[0].actor);
    let actors = responseDelete?.data[0].actor;
    // 	let updatedValue = {};
    //   updatedValue = { `responseDelete?.data[0].actor` };
    //   setNewRole((role) => ({
    //     ...role,
    //     ...updatedValue,
    //   }));
  };

  useEffect(() => {}, [message]);

  return (
    <>
      {isUpdate ? (
        <>
          <StyledTableRow
            key={role._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <StyledTableCell>
              {newRole.name}
              <Button onClick={(e) => console.log(role, newRole, title)}>
                Role
              </Button>
            </StyledTableCell>
            <StyledTableCell>{newRole.role} </StyledTableCell>
            <StyledTableCell>
              <ButtonGroup>
                <Button
                  size="small"
                  variant="contained"
                  color="warning"
                  onClick={updateRole}
                >
                  Módosítás
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={deleteRole}
                >
                  Törlés
                </Button>
              </ButtonGroup>
            </StyledTableCell>
          </StyledTableRow>
          {message && (
            <StyledTableRow>
              <StyledTableCell colSpan={3}>{message}</StyledTableCell>
            </StyledTableRow>
          )}
        </>
      ) : (
        <StyledTableRow
          key={role._id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="name"
              value={newRole.name}
              onChange={handleChange}
            />
          </StyledTableCell>
          <StyledTableCell>
            <TextField
              size="small"
              color="warning"
              name="role"
              value={newRole.role}
              onChange={handleChange}
            />
          </StyledTableCell>

          <StyledTableCell>
            <ButtonGroup>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={saveRole}
              >
                Mentés
              </Button>
              <Button
                size="small"
                variant="contained"
                color="error"
                onClick={updateRole}
              >
                Mégsem
              </Button>
            </ButtonGroup>
          </StyledTableCell>
        </StyledTableRow>
      )}
    </>

    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     margin: "5px",
    //   }}
    // >
    //   {isUpdate ? (
    //     <Box
    //     //   sx={{
    //     //     "& .MuiTextField-root": { m: 1, width: "25ch" },
    //     //   }}
    //     >
    //       {message && <div>{message}</div>}
    //       <TextField
    //         size="small"
    //         label="Neve:"
    //         InputLabelProps={{ shrink: true }}
    //         color="primary"
    //         name="newName"
    //         value={newName}
    //         onChange={(e) => setNewName(e.target.value)}
    //       />
    //       <TextField
    //         size="small"
    //         label="Szerepe:"
    //         InputLabelProps={{ shrink: true }}
    //         color="primary"
    //         name="newRole"
    //         value={newRole}
    //         onChange={(e) => setNewRole(e.target.value)}
    //       />
    //       <ButtonGroup
    //         variant="contained"
    //         sx={{
    //           Width: 80,
    //           margin: "auto",
    //         }}
    //       >
    //         <Button color="success" onClick={saveRole}>
    //           Mentés
    //         </Button>
    //         <Button color="error" onClick={() => setIsUpdate(false)}>
    //           Mégsem
    //         </Button>
    //       </ButtonGroup>
    //     </Box>
    //   ) : (
    //     <Box>
    //       {newName} - {newRole}
    //       <ButtonGroup
    //         variant="contained"
    //         sx={{
    //           Width: 80,
    //           margin: "auto",
    //         }}
    //       >
    //         <Button color="warning" onClick={() => setIsUpdate(true)}>
    //           Módosítás
    //         </Button>
    //         <Button color="error" onClick={deleteRole}>
    //           Törlés
    //         </Button>
    //       </ButtonGroup>
    //     </Box>
    //   )}
    // </div>
  );
}

export default Role;

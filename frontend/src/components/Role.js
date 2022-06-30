import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import { Button, ButtonGroup, Box, TextField } from "@mui/material";

function Role({ r, title, pfId }) {
  const { get, post } = toDoApi();
  const [isUpdate, setIsUpdate] = useState(false);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [newName, setNewName] = useState(r.name);
  const [newRole, setNewRole] = useState(r.role);

  const updateRole = async () => {
    setIsUpdate(!isUpdate);
  };

  const saveRole = async () => {
    const responseRole = await post("/performance/actor/modify", {
      actorId: r._id,
      name: newName,
      role: newRole,
    });
    console.log("responseRole", responseRole?.data, responseRole?.statusText);
    if (responseRole?.status === 400) {
      setIsError(true);
      setMessage(responseRole.statusText);
    } else {
      setIsUpdate(false);
    }
  };

  const deleteRole = async () => {
    const responseDeleteRole = await post("/performance/actor/delete", {
      performanceId: pfId,
      actorId: r._id,
    });
    console.log("responseDeleteRole status:", responseDeleteRole);
    setIsUpdate(false);
  };

  useEffect(() => {
    // console.log(r);
  }, [isUpdate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "5px",
      }}
    >
      {isUpdate ? (
        <Box
        //   sx={{
        //     "& .MuiTextField-root": { m: 1, width: "25ch" },
        //   }}
        >
          {isError && <div>{message}</div>}
          <TextField
            size="small"
            label="Neve:"
            InputLabelProps={{ shrink: true }}
            color="primary"
            name="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            size="small"
            label="Szerepe:"
            InputLabelProps={{ shrink: true }}
            color="primary"
            name="newRole"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          />
          <ButtonGroup
            variant="contained"
            sx={{
              Width: 80,
              margin: "auto",
            }}
          >
            <Button color="success" onClick={saveRole}>
              Mentés
            </Button>
            <Button color="error" onClick={() => setIsUpdate(false)}>
              Mégsem
            </Button>
          </ButtonGroup>
        </Box>
      ) : (
        <Box>
          {newName} - {newRole}
          <ButtonGroup
            variant="contained"
            sx={{
              Width: 80,
              margin: "auto",
            }}
          >
            <Button color="warning" onClick={() => setIsUpdate(true)}>
              Módosítás
            </Button>
            <Button color="error" onClick={deleteRole}>
              Törlés
            </Button>
          </ButtonGroup>
        </Box>
      )}
    </div>
  );
}

export default Role;

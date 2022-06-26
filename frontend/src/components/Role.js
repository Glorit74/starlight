import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { toDoApi } from "../api/toDoApi";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";

function Role({ title, role }) {
  const { token, user } = useAuth();
  const { get, post } = toDoApi();
  const [roles, setRoles] = useState();

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    const filteredPf = responsePf.data.filter((pf) => pf.title === title);
    console.log(filteredPf);
    setRoles(filteredPf[0].actor);
  };

  //   const updateRole = async () => {
  // 	const responseRole = await post("/performance")
  //   }

  useEffect(() => {
    getPerformance();
    // eslint-disable-next-line
  }, [title, role]);

  return (
    <>
      {roles.map((r) => (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "5px",
            }}
            key={r._id}
          >
            {r.name} - {r.role}
            <ButtonGroup
              variant="contained"
              sx={{
                Width: 80,
                margin: "auto",
              }}
            >
              <Button color="warning">Módosítás</Button>
              <Button color="error">Törlés</Button>
            </ButtonGroup>
          </div>
        </div>
      ))}
    </>
  );
}

export default Role;

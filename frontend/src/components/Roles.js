import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";

import Role from "./Role";

function Roles({ isAdd, title, name, role }) {
  const { get, post } = toDoApi();
  const [roles, setRoles] = useState([]);
  const [pfId, setPfId] = useState("");

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    const filteredPf = await responsePf.data.filter((pf) => pf.title === title);
    if (filteredPf[0]?.actor) {
      setRoles(filteredPf[0].actor);
      setPfId(filteredPf[0]._id);
    }
  };

  useEffect(() => {
    getPerformance();

    // eslint-disable-next-line
  }, [title, role, name, isAdd]);
  return (
    <>
      {roles.map((r) => (
        <div key={r._id}>
          <Role r={r} title={title} pfId={pfId} />
        </div>
      ))}
    </>
  );
}

export default Roles;

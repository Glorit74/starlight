import React, { useState, useEffect } from "react";
import { toDoApi } from "./toDoApi";
import { useAuth } from "../providers/auth";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

function Selection({ endpoint, param, label }) {
  const { token } = useAuth();
  const { get } = toDoApi();
  const [selection, setSelection] = useState([]);
  const [selected, setSelected] = useState("");

  const myVariable = "select." + param;
  let myVariable2;
  myVariable2 = `select.${param}`;

  const getSelection = async () => {
    const responsePf = await get(`${endpoint}`);
    setSelection(responsePf.data);
  };

  useEffect(() => {
    getSelection();
    // console.log(selection);
    // eslint-disable-next-line
  }, []);
  return (
    <FormControl style={{ width: "80%", margin: "5px" }}>
      <InputLabel id="select_label">{label}</InputLabel>
      <Select
        labelId="select_label"
        id="select"
        endpoint={selected}
        label={label}
        onChange={(e) => setSelected(e.target.value)}
      >
        {selection.map((select) => (
          <MenuItem key={select._id} value={myVariable}>
            `select.[${param}]`
            {myVariable}
            {myVariable2}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Selection;

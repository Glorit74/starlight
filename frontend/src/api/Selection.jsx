import React, { useState, useEffect } from "react";
import { toDoApi } from "./toDoApi";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

function Selection({ endpoint, label, selected, setSelected }) {
  const { get } = toDoApi();
  const [menuItem, setMenuItem] = useState([]);

  //   const myVariable = "select." + param;

  const getSelection = async () => {
    const responsePf = await get(`${endpoint}`);
    setMenuItem(responsePf.data);
  };

  useEffect(() => {
    getSelection();
    // eslint-disable-next-line
  }, [selected]);

  return (
    <FormControl
      style={{ minWidth: "20%", maxWidth: "40%", margin: "5px" }}
      size="small"
    >
      <InputLabel id="select_label">{label}</InputLabel>
      <Select
        labelId="select_label"
        id="select"
        value={selected}
        label={label}
        onChange={(e) => setSelected(e.target.value)}
        autoWidth
      >
        {menuItem.map((select) => (
          <MenuItem key={select._id} value={select.name}>
            {select.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Selection;

import React, { useState, useEffect } from "react";
import { toDoApi } from "./toDoApi";
import { useAuth } from "../providers/auth";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";

function Selection({ endpoint, label, selected, setSelected }) {
  const { token } = useAuth();
  const { get } = toDoApi();
  const [menuItem, setMenuItem] = useState([]);
  //   const [selected, setSelected] = useState(
  //     defaultSelection ? defaultSelection : ""
  //   );

  //   const myVariable = "select." + param;
  //   let myVariable2;
  //   myVariable2 = `select.${param}`;

  const getSelection = async () => {
    const responsePf = await get(`${endpoint}`);
    setMenuItem(responsePf.data);
    console.log(menuItem, selected);
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

import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { toDoApi } from "../api/toDoApi";
import { FormGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Select, MenuItem, InputLabel } from "@mui/material";
import Places from "./Places";

function PlaceHolder() {
  const { token } = useAuth();
  const { post, get } = toDoApi();
  const [isAdd, setIsAdd] = useState(false);

  const [place, setPlace] = useState({
    palace: "",
    date: "",
    time: "",
  });

  const [placeSelect, setPlaceSelect] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");

  const handleChange = (e) => {
    setPlace((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };

  const getPlaces = async () => {
    const responsePlaces = await get("/place");
    setPlaceSelect(responsePlaces.data);
    // console.log(placeSelect);
  };

  const addVenue = async () => {
    const responseVenu = await post("/place", {
      place: selectedPlace,
      date: place.date,
      time: place.time,
    });
    setIsAdd(!isAdd);
    console.log("új helyszín", selectedPlace);
  };

  useEffect(() => {
    getPlaces();
    // eslint-disable-next-line
  }, [isAdd]);
  return (
    <div>
      <h2>Helyszínek:</h2>
      {token && (
        <>
          <Box
            sx={{
              minWidth: 120,
              maxWidth: 500,
              margin: "auto",
            }}
          >
            <FormGroup>
              {/* <InputLabel id="place_label">Helyszín:</InputLabel> */}
              <Select
                labelId="place_label"
                id="place"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
              >
                {placeSelect.map((p) => (
                  <MenuItem key={p._id} value={p.name}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                label="Dátum:"
                InputLabelProps={{ shrink: true }}
                type="date"
                color="primary"
                name="date"
                value={place.date}
                onChange={handleChange}
              />
              <TextField
                label="Időpont:"
                type="time"
                color="primary"
                name="time"
                defaultValue="19:00"
                // value={place.time}
                onChange={handleChange}
              />
              <Button variant="contained" color="success" onClick={addVenue}>
                Hozzáadás
              </Button>
            </FormGroup>
          </Box>
          <Places
            isAdd={isAdd}
            place={selectedPlace}
            date={place.date}
            time={place.time}
          />
        </>
      )}
    </div>
  );
}

export default PlaceHolder;

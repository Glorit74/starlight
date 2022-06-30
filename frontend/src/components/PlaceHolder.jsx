import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { toDoApi } from "../api/toDoApi";
import { Box, FormGroup, FormControl, TextField, Button } from "@mui/material";
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

  const [selectedPf, setSelectedPf] = useState("");
  const [selectedPfId, setSelectedPfId] = useState("");
  const [performanceSelect, setPerformanceSelect] = useState([]);
  const [placeSelect, setPlaceSelect] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPlace((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    setPerformanceSelect(responsePf.data);
  };

  const getPlaces = async () => {
    const responsePlaces = await get("/place");
    setPlaceSelect(responsePlaces.data);
  };

  const addVenue = async () => {
    setMessage("");
    setSelectedPfId(performanceSelect.filter((p) => p.title === selectedPf));
    console.log(selectedPfId[0]._id);

    const responseVenue = await post(
      `/performance/venue/?id=${selectedPfId[0]._id}`,
      {
        place: selectedPlace,
        date: place.date,
        time: place.time,
      }
    );

    console.log(responseVenue);
    if (responseVenue.status === 400) setMessage(responseVenue?.data);
    if (responseVenue.status === 200) setMessage("Rözgítésre került");

    setIsAdd(!isAdd);
  };

  useEffect(() => {
    getPlaces();
    getPerformance();
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
              <FormControl required>
                <InputLabel id="performance_label">Előadás:</InputLabel>
                <Select
                  id="performance"
                  value={selectedPf}
                  labelId="performance_label"
                  label={"Előadás:"}
                  onChange={(e) => {
                    setSelectedPf(e.target.value);
                    setMessage("");
                  }}
                >
                  {performanceSelect.map((pf) => (
                    <MenuItem key={pf._id} value={pf.title}>
                      {pf.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel style={{ display: "inline" }} id="place_label">
                  Helyszín:
                </InputLabel>
                <Select
                  labelId="place_label"
                  label={"Helyszín"}
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
                <Button>Új helyszín</Button>
              </FormControl>

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
                // defaultValue="19:00"
                value={place.time}
                onChange={handleChange}
              />
              <Button variant="contained" color="success" onClick={addVenue}>
                Hozzáadás
              </Button>
            </FormGroup>
          </Box>
          <div>{message}</div>
          <Places
            isAdd={isAdd}
            title={selectedPf}
            place={selectedPlace}
            // date={place.date}
            // time={place.time}
          />
        </>
      )}
    </div>
  );
}

export default PlaceHolder;

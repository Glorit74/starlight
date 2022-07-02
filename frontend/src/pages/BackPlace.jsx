import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  ButtonGroup,
} from "@mui/material";
import Awards from "../components/Awards";

function BackPlace() {
  const { post, get } = toDoApi();
  const navigate = useNavigate();

  const [place, setPlace] = useState({
    id: "",
    name: "",
    shortName: "",
    zip: "",
    city: "",
    street: "",
    email: "",
    phone: "",
    mobile: "",
    website: "",
    picture: "",
    description: "",
  });
  const [checked, setChecked] = useState(true);
  const [placeId, setPlaceId] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [placeSelect, setPlaceSelect] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPlace((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };
  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  //clear input fields

  const handleNew = (e) => {
    setPlace((prevText) => {
      return { ...prevText, [e.target.name]: "" };
    });
  };
  //   console.log(placeId ? placeId : "még nincs");
  const getPlaces = async () => {
    const responsePlaces = await get("/place");
    setPlaceSelect(responsePlaces.data);
    if (selectedPlace && placeSelect.length !== 0) {
      const filteredPlace = await responsePlaces.data.filter(
        (place) => place.name === selectedPlace
      );
      if (filteredPlace) setPlaceId(filteredPlace[0]._id);
    }
  };

  const savePlace = async () => {
    console.log("id", placeId);
    //   const responsePlace = await post("/place", {
    //       id: placeId ? placeId : null,
    //       name: place.name,
    //       shortName: place.shortName,
    //       zip: place.zip,
    //       city: place.city,
    //       street: place.street,
    //       email: place.email,
    //       phone: place.phone,
    //       mobile: place.mobile,
    //       website: place.website,
    //       picture: place.picture,
    //       description: place.description,
    //       isParking: place.isParking,
    //     });
    //     console.log("resposne", responsePlace);
    // if (responsePlace) setPlaceSelect(responsePlace.data);
  };
  useEffect(() => {
    getPlaces();
  }, [placeSelect, selectedPlace, place]);

  return (
    <>
      <h2>Új helyszín rögzítése:</h2>

      <>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "80ch" },

            backgroundColor: "lightgray",
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl variant="filled">
            <TextField
              label="Helyszín neve"
              helperText="kötelezően megadandó adat"
              color="primary"
              required
              name="name"
              value={place.name}
              onChange={handleChange}
            />
            <TextField
              label="Rövid név"
              color="primary"
              name="shortName"
              value={place.shortName}
              onChange={handleChange}
            />
            <TextField
              sx={{ width: "150px" }}
              label="Irányítószám"
              type="number"
              color="primary"
              name="zip"
              value={place.zip}
              onChange={handleChange}
            />
            <TextField
              label="Település"
              color="primary"
              name="city"
              value={place.city}
              onChange={handleChange}
            />
            <TextField
              label="Cím (utca, házszám)"
              placeholder="Kiss Lajos utca 12."
              color="primary"
              name="street"
              value={place.street}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              placeholder="minta.janos@gmail.com"
              color="primary"
              name="email"
              value={place.email}
              onChange={handleChange}
            />
            <TextField
              label="Vezetékes telefonszám"
              placeholder="12345678"
              color="primary"
              name="phone"
              value={place.phone}
              onChange={handleChange}
            />
            <TextField
              label="Mobil telefonszám"
              placeholder="201234567"
              color="primary"
              name="mobile"
              value={place.mobile}
              onChange={handleChange}
            />
            <TextField
              multiline
              label="Honlap"
              color="primary"
              name="website"
              value={place.website}
              onChange={handleChange}
            />
            <TextField
              multiline
              label="Leírás"
              color="primary"
              name="description"
              value={place.description}
              onChange={handleChange}
            />
            <TextField
              multiline
              label="Fénykép"
              color="primary"
              name="picture"
              value={place.picture}
              onChange={handleChange}
            />
          </FormControl>

          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheck} />}
            label="Parkoló van a közelben"
          ></FormControlLabel>
          <ButtonGroup>
            <Button
              sx={{ maxWidth: "120px", m: "10px" }}
              onClick={savePlace}
              variant="contained"
              color="success"
            >
              Mentés
            </Button>
            <Button
              sx={{ maxWidth: "120px", m: "10px" }}
              onClick={handleNew}
              variant="contained"
              color="primary"
            >
              Új helyszí
            </Button>
            <Button
              sx={{ maxWidth: "120px", m: "10px" }}
              onClick={(e) => {
                navigate("/backpf");
              }}
              variant="contained"
              color="info"
            >
              Vissza
            </Button>
          </ButtonGroup>
        </Box>
        <Box>
          <h2>Mentett helyszínek</h2>
        </Box>
      </>
    </>
  );
}

export default BackPlace;

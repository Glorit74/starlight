import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
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

function BackPlace({ name }) {
  const { token } = useAuth();
  const { post, get } = toDoApi();
  const navigate = useNavigate();

  const [actor, setActor] = useState({
    name: name ? name : "",
    description: "",
    award_title: "",
    award_year: "",
    picture: "",
    role_title: "",
    role_role: "",
  });
  const [checked, setChecked] = useState(true);
  const [actorId, setActorId] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [selectedActor, setSelectedActor] = useState("");
  const [actorSelect, setActorSelect] = useState([]);
  const [awardMessage, setAwareMessage] = useState("");

  const handleChange = (e) => {
    setActor((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  //clear input fields

  const handleNew = (e) => {
    setActor((prevText) => {
      return { ...prevText, [e.target.name]: "" };
    });
  };

  const getActors = async () => {
    const responseActors = await get("/actor");
    setActorSelect(responseActors.data);
  };

  const saveActor = async () => {
    const responseActor = await post("/actor", {
      name: actor.name,
      description: actor.description,
      picture: actor.picture,
      //   award_title: actor.award_title,
      //   award_year: actor.award_year,
      //   role_title: actor.role_title,
      //   role_role: actor.role_role,
      isActive: checked,
    });
    getActors();
  };

  const saveAward = async () => {
    let filteredActor = actorSelect.filter((a) => a.name === selectedActor);
    setActorId(filteredActor[0]._id);
    const responseAward = await post("actor/awards", {
      name: selectedActor,
      title: actor.award_title,
      year: actor.award_year,
      id: actorId,
    });
    if (responseAward.status === 400) setAwareMessage(responseAward.statusText);
    console.log(responseAward);
  };

  const saveRole = async () => {
    let filteredActor = actorSelect.filter((a) => a.name === selectedActor);
    setActorId(filteredActor[0]._id);
    const responseRole = await post("actor/role", {
      name: selectedActor,
      title: actor.role_title,
      role: actor.role_role,
      id: actorId,
    });
    if (responseRole.status === 400) setAwareMessage(responseRole.statusText);
    console.log(responseRole);
  };

  useEffect(() => {
    getActors();
  }, []);

  return (
    <>
      <h2>Új színművész rögzítése:</h2>
      {token && (
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
                label="Színész neve"
                helperText="kötelezően megadandó adat"
                color="primary"
                required
                name="name"
                value={actor.name}
                onChange={handleChange}
              />
              <TextField
                multiline
                label="Leírás"
                color="primary"
                name="description"
                value={actor.description}
                onChange={handleChange}
              />
              <TextField
                multiline
                label="Fénykép"
                color="primary"
                name="picture"
                value={actor.picture}
                onChange={handleChange}
              />
            </FormControl>

            <FormControlLabel
              control={<Checkbox checked={checked} onChange={handleCheck} />}
              label="Aktív tag"
            ></FormControlLabel>
            <ButtonGroup>
              <Button
                sx={{ maxWidth: "120px", m: "10px" }}
                onClick={saveActor}
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
                Új színész
              </Button>
              <Button
                sx={{ maxWidth: "120px", m: "10px" }}
                onClick={(e) => navigate("/backpf")}
                variant="contained"
                color="info"
              >
                Vissza
              </Button>
            </ButtonGroup>
            <h2>Új díj rögzítése:</h2>
            <FormControl>
              <InputLabel id="selectedActor_label">Színész neve:</InputLabel>
              <Select
                labelId="selectedActor_label"
                id="selectedActor"
                value={selectedActor}
                label="Színész neve:"
                onChange={(e) => setSelectedActor(e.target.value)}
              >
                {actorSelect.map((a) => (
                  <MenuItem key={a._id} value={a.name}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                label="Díj megnevezése"
                color="primary"
                name="award_title"
                value={actor.award_title}
                onChange={handleChange}
              />
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "d.{4}" }}
                label="Díj elnyerésének éve"
                color="primary"
                name="award_year"
                value={actor.award_year}
                onChange={handleChange}
              />
              <div>{awardMessage}</div>
              <Button
                sx={{ maxWidth: "120px", m: "10px" }}
                onClick={saveAward}
                variant="contained"
                color="primary"
                // disabled={!actorId ? true : false}
              >
                Új díj
              </Button>
            </FormControl>
          </Box>
          <Box>
            <Awards name={selectedActor} />
          </Box>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "80ch" },

              backgroundColor: "lightgray",
            }}
            noValidate
            autoComplete="off"
          >
            <h2>Új szerep rögzítése:</h2>
            <FormControl>
              <InputLabel id="selectedActor_label">Színész neve:</InputLabel>
              <Select
                labelId="selectedActor_label"
                id="selectedActor"
                value={selectedActor}
                label="Színész neve:"
                onChange={(e) => setSelectedActor(e.target.value)}
              >
                {actorSelect.map((a) => (
                  <MenuItem key={a._id} value={a.name}>
                    {a.name}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Színdarab"
                color="primary"
                name="role_title"
                value={actor.role_title}
                onChange={handleChange}
              />
              <TextField
                label="Szerep"
                color="primary"
                name="role_role"
                value={actor.role_role}
                onChange={handleChange}
              />
              <Button
                sx={{ maxWidth: "120px", m: "10px" }}
                onClick={saveRole}
                variant="contained"
                color="primary"
                disabled={!actorId ? true : false}
              >
                Új szerep
              </Button>
            </FormControl>
          </Box>
        </>
      )}
    </>
  );
}

export default BackPlace;

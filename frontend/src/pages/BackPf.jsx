import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { toDoApi } from "../api/toDoApi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  FormGroup,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import Roles from "../components/Roles";
import PlaceHolder from "../components/PlaceHolder";
import Selection from "../api/Selection";
import { useNavigate } from "react-router-dom";

function BackPf() {
  const { token } = useAuth();
  const { post, get } = toDoApi();
  const navigate = useNavigate();

  const [performance, setPerformance] = useState({
    title: "",
    subTitle: "",
    author: "",
    director: "",
    music: "",
    choregrapher: "",
    duration: "",
    act: "",
    picture: "",
    video: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const [actorSelect, setActorSelect] = useState([]);
  const [performanceSelect, setPerformanceSelect] = useState([]);
  const [selectedPf, setSelectedPf] = useState("");
  const [selectedActor, setSelectedActor] = useState("");
  const [actorRole, setActorRole] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const handleChange = (e) => {
    setPerformance((prevText) => {
      return { ...prevText, [e.target.name]: e.target.value };
    });
  };

  const createNewPerformance = async () => {
    const responseNewPf = await post("/performance", performance);
    console.log("Pf: ", responseNewPf?.status);
    if (responseNewPf?.status === 200) {
      setMessage("Az adatok mentésre kerültek.");
      setIsAdd(!isAdd);
    }
    if (responseNewPf?.status === 500) {
      setMessage(
        "A mentés nem történt meg, nincs kapcsolat az adatbázissal. Próbálja újra később!"
      );
    }
  };

  const getActors = async () => {
    const responseActors = await get("/actor");
    setActorSelect(responseActors.data);
  };

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    setPerformanceSelect(responsePf.data);
  };

  const addActorsRole = async () => {
    const responseRole = await post("/performance/actor", {
      name: selectedActor,
      title: selectedPf,
      role: actorRole,
    });
    setIsAdd(!isAdd);
  };

  const addActor = () => {
    navigate("/backplace");
  };

  useEffect(() => {
    getActors();
    getPerformance();
    setMessage("");

    // eslint-disable-next-line
  }, [isAdd]);

  return (
    <div>
      <Selection endpoint="place" label="Helyszín" />
      <h2>Előadások:</h2>
      {token && (
        <>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddCircleOutlineIcon />}
            onClick={createNewPerformance}
          >
            ÚJ
          </Button>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "80ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl
              //   sx={{ m: 1, minWidth: "25ch", maxWidth: "35ch" }}
              variant="outlined"
            >
              <div>
                <TextField
                  label="Előadás címe"
                  helperText="kötelezően megadandó adat"
                  color="primary"
                  focused
                  required
                  name="title"
                  value={performance.title}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Alcím"
                  color="primary"
                  name="subTitle"
                  value={performance.subTitle}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <TextField
                  label="Szerző"
                  color="primary"
                  name="author"
                  value={performance.author}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Rendező"
                  color="primary"
                  name="director"
                  value={performance.director}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <TextField
                  label="Music"
                  color="primary"
                  name="music"
                  value={performance.music}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Koreográfia"
                  color="primary"
                  name="choregrapher"
                  value={performance.choregrapher}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <TextField
                  label="Hossza (percben)"
                  color="primary"
                  name="duration"
                  // type="number"
                  // endAdornment={
                  //   <InputAdornment position="end">perc</InputAdornment>
                  // }
                  value={performance.duration}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Felvonás száma"
                  color="primary"
                  name="act"
                  // type="number"
                  // InputLabelProps={{
                  //   shrink: true,
                  // }}
                  value={performance.act}
                  onChange={(e) => handleChange(e)}
                />
                <TextField
                  label="Fénykép"
                  color="primary"
                  name="picture"
                  value={performance.picture}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <TextField
                label="Előzetes"
                color="primary"
                name="video"
                value={performance.video}
                onChange={(e) => handleChange(e)}
              />

              <TextField
                multiline
                label="Tartalom"
                maxRows={20}
                minRows={4}
                name="description"
                value={performance.description}
                onChange={(e) => handleChange(e)}
              />
            </FormControl>
            <div className="message">{message}</div>
          </Box>
          <h2>Színész hozzáadása:</h2>
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
                  labelId="performance_label"
                  id="performance"
                  value={selectedPf}
                  label={"Előadás:"}
                  onChange={(e) => setSelectedPf(e.target.value)}
                >
                  {performanceSelect.map((pf) => (
                    <MenuItem key={pf._id} value={pf.title}>
                      {pf.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="selectedActor_label">Neve:</InputLabel>
                <Select
                  labelId="selectedActor_label"
                  id="selectedActor"
                  value={selectedActor}
                  label="Neve:"
                  onChange={(e) => setSelectedActor(e.target.value)}
                >
                  {actorSelect.map((a) => (
                    <MenuItem key={a._id} value={a.name}>
                      {a.name}
                    </MenuItem>
                  ))}
                </Select>
                <Button onClick={(e) => navigate("/backplace")}>
                  Új színész
                </Button>
              </FormControl>
              <TextField
                label="Szerepe:"
                color="primary"
                name="actorRole"
                value={actorRole}
                onChange={(e) => setActorRole(e.target.value)}
              />
              <Button
                variant="contained"
                color="success"
                onClick={addActorsRole}
              >
                Hozzáadás
              </Button>
            </FormGroup>
          </Box>
          <Roles
            isAdd={isAdd}
            title={selectedPf}
            role={actorRole}
            name={selectedActor}
          />
          <PlaceHolder />
        </>
      )}
    </div>
  );
}

export default BackPf;

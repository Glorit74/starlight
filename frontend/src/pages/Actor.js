import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import Navbar from "../components/Navbar";

function Actor() {
  const { get } = toDoApi();
  //   const [actors, setActors] = useState({
  //     name: "",
  //     description: "",
  //     picture: "",
  //     awards: [],
  //   });
  const [actors, setActors] = useState([]);

  const getActors = async () => {
    const responsePf = await get("/actor");
    setActors(responsePf.data);
  };

  useEffect(() => {
    getActors();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <header className="actor_header">Színművészeink</header>
      <button onClick={(e) => console.log(actors)}>GET ACTOR</button>
      {actors.map((actor) => (
        <figure className="actor_figure">
          <img
            src={actor.picture}
            alt={actor.name}
            width="100wh"
            className="actor_img"
          ></img>
          <figcaption className="actor_caption">{actor.name}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export default Actor;

import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import "../stlyes/actor.scss";

import styled from "styled-components";

function Actor() {
  const { get } = toDoApi();

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
    <main>
      <Header>Társulat</Header>
      {/* <button onClick={(e) => console.log(actors)}>GET ACTOR</button> */}
      <Header_small>Vezetőség</Header_small>
      <article className="actor_up">
        <figure className="actor_figure actor_figure_up">
          <img
            src="/picture/Péter.jpg"
            alt="Kovács Péter"
            className="actor_img"
          ></img>
          <figcaption className="actor_caption">Kovács Péter</figcaption>
        </figure>
      </article>
      <Header_small>Színművészeink</Header_small>
      <article className="actor_down">
        {actors.map((actor) => (
          <figure className="actor_figure ctor_figure_down">
            <a href="/">
              <img
                src={actor.picture}
                alt={actor.name}
                className="actor_img"
              ></img>
            </a>
            <figcaption className="actor_caption">{actor.name}</figcaption>
          </figure>
        ))}
      </article>
    </main>
  );
}

export default Actor;

const Header = styled.h1`
  text-transform: uppercase;
  color: #950740;
  margin: 24px;
  font-size: 30px;
  font-weight: 800;
  text-align: left;
`;
const Header_small = styled.h2`
  text-transform: uppercase;
  color: #950740;
  margin: 20px;
  font-size: 20px;
  font-weight: 600;
  text-align: left;
`;

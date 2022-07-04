import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import "../stlyes/actor.scss";

import styled from "styled-components";

function Actor() {
  const { get } = toDoApi();

  const [actors, setActors] = useState([]);
  const [performance, setPf] = useState([]);
  const [selectedActor, setSelectedActor] = useState("");

  const getActors = async () => {
    const responseActor = await get("/actor");
    setActors(responseActor.data);
  };

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    setPf(responsePf);
    console.log(performance?.data);
    if (performance?.data) {
      const actorRoles = performance.data.filter((pf) => pf.actor.length);

      console.log(actorRoles);
    }
  };

  useEffect(() => {
    getActors();
    // setSelectedActor([]);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <Header>Társulat</Header>

      {selectedActor ? (
        <div className="actor_container">
          <div className="item actor_header">
            <Header_small>{selectedActor.name} </Header_small>
          </div>
          <div className="item actor_text">{selectedActor.description}</div>
          <div className="item actor_link">
            <button onClick={(e) => setSelectedActor("")}>Vissza</button>
          </div>
          <div className="item actor_space"></div>
          <div className="item actor_picture">
            <div
              style={{
                width: "100%",
                border: "1px solid #ca6e19",
                padding: "8px 8px 12px",
              }}
            >
              <img
                src={
                  selectedActor.picture
                    ? selectedActor.picture
                    : "picture/no-image-icon.png"
                }
                alt={""}
                style={{ width: "100%", height: "auto" }}
              ></img>
            </div>
          </div>
          <div className="item actor_awards">
            {selectedActor.awards.length && (
              <div>
                <Header_small>Đijai:</Header_small>
                {selectedActor.awards.map((award) => (
                  <div
                    key={award._id}
                    style={{ display: "flex", marginLeft: "50px" }}
                  >
                    <div>{award.title}</div>
                    <div style={{}}>{award.year}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
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
              <figure
                className="actor_figure actor_figure_down"
                key={actor._id}
                onClick={(e) => {
                  setSelectedActor(actor);
                  getPerformance();
                }}
              >
                <img
                  src={actor.picture ? actor.picture : "no-image-icon.png"}
                  alt={actor.name}
                  className="actor_img"
                ></img>

                <figcaption className="actor_caption">{actor.name}</figcaption>
              </figure>
            ))}
          </article>
        </div>
      )}
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

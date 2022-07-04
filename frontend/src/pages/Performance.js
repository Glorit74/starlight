import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";
import styled from "styled-components";

function Performance() {
  const { get } = toDoApi();
  const [pf, setPf] = useState([]);

  const divStyle = {
    width: "50vw",
    margin: "30px 20px 10px ",
  };

  const id = "62af3bb24dd95fb9ef8f9202";
  const getPerformance = async () => {
    const responsePf = await get("/performance");
    setPf((responsePf?.data.filter((pf) => pf._id === id))[0]);
  };

  useEffect((e) => {
    getPerformance();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      {/* <button onClick={(e) => console.log("eredmény", pf)}>Get PF</button> */}

      <div style={divStyle}>
        <div>
          <img src={pf.picture} alt=""></img>
        </div>
        <Header style={{ textAlign: "right" }}>Szereplők</Header>
        {pf.actor.map((a) => (
          <div
            key={a._id}
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div>{a.role}</div> <Name>- {a.name}</Name>
          </div>
        ))}
      </div>
      <div style={divStyle}>
        <div>{pf.author}</div>
        <Header>{pf.title}</Header>
        <div>{pf.subtitle}</div>
        <div>
          {pf.duration} perc, {pf.act} felvonásban{" "}
        </div>
        <div style={{ textAlign: "justify", padding: "0px 10px" }}>
          {pf.description}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-Start",
          }}
        >
          <div>
            <Header_small>Rendező: </Header_small> {pf.director}
          </div>
          <div>
            <Header_small>Zene: </Header_small> {pf.music}
          </div>
          <div>
            <Header_small>Koreográfia: </Header_small> {pf.choregrapher}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;

const Header = styled.h1`
  text-transform: uppercase;
  color: #950740;
  margin: 5px;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;
const Name = styled.h2`
  display: inline;
  text-transform: uppercase;
  color: #950740;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
   &:hover {
    color: #ca6e19;
	cursor: pointer;
`;

const Header_small = styled.h3`
  display: inline;
  text-transform: uppercase;
  color: #950740;
  margin-left: 5px;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
`;

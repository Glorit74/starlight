import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";

import styled from "styled-components";

function Place() {
  const { post, get } = toDoApi();
  const [places, setPlaces] = useState([]);

  const getPlaces = async () => {
    const responsePlaces = await get("/place");
    setPlaces(responsePlaces.data);
  };

  useEffect(() => {
    getPlaces();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      {places.map((place) => (
        <Container key={place._id}>
          <Header>{place.name}</Header>
          <div>
            <Header_small>Cím:</Header_small> {place.address.zip}{" "}
            {place.address.city}, {place.address.street}{" "}
          </div>

          <div>
            <Header_small>Mobil telefon:</Header_small> {place.mobile}
          </div>
          <div>
            <Header_small>Vezetékes telefon:</Header_small> {place.phone}
          </div>
          <div>
            <Header_small>Honlap elérhetősége</Header_small>

            <a style={{ textDecoration: "underline" }} href={place.website}>
              {place.website}
            </a>
          </div>
          <div>{place.description}</div>
          <img src={place.picture} alt=""></img>
        </Container>
      ))}
    </div>
  );
}

export default Place;

const Container = styled.div`
  margin: 0 60px 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Header = styled.h1`
  text-transform: uppercase;
  color: #950740;
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
`;

const Header_small = styled.h2`
  display: inline;
  text-transform: uppercase;
  color: #950740;
  margin: 15px;
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

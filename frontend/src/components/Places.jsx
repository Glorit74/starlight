import React, { useState, useEffect } from "react";
import { useAuth } from "../providers/auth";
import { toDoApi } from "../api/toDoApi";

import Place from "./Place";

function Places({ place, date, time, isAdd }) {
  const { token, user } = useAuth();
  const { get, post } = toDoApi();
  const [places, setPlaces] = useState([]);
  const [pfId, setPfId] = useState("");

  const getPlace = async () => {
    console.log("indul a getPlace");
    const responsePLaces = await get("/place");
    const filteredPlace = await responsePLaces.data.filter(
      (p) => p.place === place
    );
    if (filteredPlace[0]?.place) {
      setPlaces(filteredPlace[0].place);
      setPfId(filteredPlace[0]._id);
    }
    console.log(place, filteredPlace[0], pfId);
  };

  useEffect(() => {
    getPlace();
    console.log("Places useEffect");

    // eslint-disable-next-line
  }, [place, date, time, isAdd]);

  return (
    <>
      kakaó
      {/* {places.map((p) => (
        <div key={p._id}>
          <Place p={p} place={place} pfId={pfId} />
        </div>
      ))} */}
    </>
  );
}

export default Places;

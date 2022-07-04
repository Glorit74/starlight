import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";

function Program() {
  const { get } = toDoApi();
  const [performance, setPf] = useState([]);
  let filteredPfs;

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    setPf(responsePf.data);
    filteredPfs = performance.filter((pf) => pf.venue.length).map();
  };

  const sortByDate = () => {};
  useEffect(() => {
    getPerformance();
  }, []);
  return (
    <main>
      <div>Dátum</div>
      <div>
        <div>
          <button onClick={(e) => console.log(performance[0].venue)}>
            Időpont
          </button>
        </div>
        <div>nézet</div>
      </div>
      {/* {performance.filter((pf) => pf.venue.length
        {}
          <div key={pf._id} style={{ display: "flex" }}>
            <figure></figure>
            <div>időpont</div>
            <div>{pf.title}</div>
            <div>
              <button>Részletek</button>
            </div>
          </div>;}
      ))} */}
    </main>
  );
}

export default Program;

import React, { useState, useEffect } from "react";
import { toDoApi } from "../api/toDoApi";

function Performance() {
  const { get } = toDoApi();
  const [performance, setPf] = useState([]);

  const getPerformance = async () => {
    const responsePf = await get("/performance");
    setPf(responsePf);
  };
  return <div>Performance</div>;
}

export default Performance;

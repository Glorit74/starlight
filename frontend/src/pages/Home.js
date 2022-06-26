import React, { useState } from "react";
import { useAuth } from "../providers/auth";

function Home() {
  const { auth, token } = useAuth();
  return (
    <div>
      <h2>Home</h2>
      <p>{token ? "Logged in" : "Anonymus"}</p>
    </div>
  );
}

export default Home;

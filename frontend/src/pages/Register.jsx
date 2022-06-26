import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";

function Register() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    if (user.userId) navigate("/backpf");
  }, [user]);

  return (
    <div>
      <h2>Register new username</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => register(username)}>Register</button>
    </div>
  );
}

export default Register;

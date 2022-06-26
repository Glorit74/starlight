import React from "react";
import { useEffect } from "react";
import { useAuth } from "../providers/auth";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loginWithCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      //   console.log(code);

      if (code) {
        await login(code, "google");
      }
      navigate("/backpf");
    };
    loginWithCode();

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <h2>CallBack</h2>
    </>
  );
};

export default Callback;

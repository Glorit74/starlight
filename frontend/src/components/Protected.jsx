import React from "react";
import { useAuth } from "../providers/auth";
import { Navigate, useLocation } from "react-router-dom";

const Protected = ({ children }) => {
  const { token, user } = useAuth();

  const location = useLocation();

  console.log("Protected location: ", location);

  return (
    <>
      {!token ? (
        <Navigate to={"/"} />
      ) : !user.userId && location.pathname !== "/register" ? (
        <Navigate to={"/register"} />
      ) : (
        children
      )}
    </>
  );
  //   </><React.Fragment>{children}</React.Fragment>;
};

export default Protected;

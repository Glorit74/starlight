import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import jwt from "jwt-decode"; //no validation, just decode
import { toDoApi } from "../api/toDoApi";
// import config from "../app.config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const { post } = toDoApi();

  const auth = () => {
    const googleBaseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const searchParams = new URLSearchParams();
    searchParams.append("response_type", "code");
    searchParams.append(
      "client_id",
      "806136419820-ne2p17i3tjap5h3rc1r6a0gf88sm3gjm.apps.googleusercontent.com"
    );
    searchParams.append("scope", "openid");
    searchParams.append("redirect_uri", "http://localhost:3000/callback");
    searchParams.append("prompt", "select_account");

    const fullUrl = googleBaseUrl + "?" + searchParams.toString();
    window.open(fullUrl, "_self");
  };

  const login = async (code, provider) => {
    try {
      const responseLogin = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          code: code,
          provider: provider,
        }
      );
      console.log("sessionToken:", responseLogin.data.sessionToken);
      setToken(responseLogin.data.sessionToken);
      localStorage.setItem("token", responseLogin.data.sessionToken);
      setUser(jwt(responseLogin.data.sessionToken));
      console.log("user token from provider. ", user);
    } catch (error) {
      console.log("login error: ", error);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const register = async (username) => {
    const responseRegister = await post("user/create", { username });

    console.log("Register", responseRegister?.status);

    if (responseRegister?.status === 200) {
      setToken(responseRegister.data.sessionToken);

      localStorage.setItem("token", responseRegister.data.sessionToken);
      setUser(jwt(responseRegister.data.sessionToken));
    }
    //   }
  };

  const contextValue = { token, user, auth, logout, login, register };

  useEffect(() => {
    const tokenInStorage = localStorage.getItem("token");
    if (tokenInStorage) {
      setToken(tokenInStorage);
      setUser(jwt(tokenInStorage));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
//custom hook

const useAuth = () => {
  let context = useContext(AuthContext);
  if (!context) throw new Error("add AuthProvider to root");
  return context;
};

export { AuthProvider, useAuth };

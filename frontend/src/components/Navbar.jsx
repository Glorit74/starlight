import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import "../stlyes/navbar.scss";

function Navbar() {
  const { auth, token, logout } = useAuth();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "0px 4px 3px 1px gray",
      }}
    >
      <div>
        <Link to="/">
          <div style={{ width: "70px", height: "70px" }}>
            <img src="picture/logo.png" alt="Starlight"></img>
          </div>
        </Link>
      </div>

      <div>
        {token ? (
          <>
            <Link className="link" to="/backpf">
              Előadások
            </Link>
            <Link className="link" to="/backplace">
              Helyszínek
            </Link>
            <Link className="link" to="/backactor">
              Színművészek
            </Link>
            <button className="button" onClick={logout}>
              <LogoutOutlinedIcon />
            </button>
          </>
        ) : (
          <>
            <Link className="link" to="/program">
              Műsor
            </Link>
            <Link className="link" to="/performance">
              Előadás
            </Link>
            <Link className="link" to="/place">
              Helyszín
            </Link>
            <Link className="link" to="/actor">
              Társulat
            </Link>
            <Link className="link" to="/about">
              Kapcsolat
            </Link>
            <button className="button" onClick={auth}>
              <LoginOutlinedIcon />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

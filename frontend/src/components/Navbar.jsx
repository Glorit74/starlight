import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../providers/auth";
// import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Navbar() {
  const { auth, token, logout } = useAuth();

  return (
    <nav
      style={{
        background: "gray",
        display: "flex",
        justifyContent: "space-between",
        padding: "7px",
        boxShadow: "0px 2px 0 4 gray",
      }}
    >
      <div>
        <Link to="/">Home</Link>
      </div>

      <div>
        {token ? (
          <>
            <Link to="/backpf">Előadások</Link>
            <Link to="/backplace">Helyszínek</Link>
            <Link to="/backactor">Színművészek</Link>
            <button onClick={logout}>
              {/* <LoginOutlinedIcon /> */}Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/program">Műsor</Link>
            <Link to="/performance">Előadás</Link>
            <Link to="/place">Helyszín</Link>
            <Link to="/actor">Társulat</Link>
            <Link to="/about">Kapcsolat</Link>
            <button onClick={auth}>{/* <LogoutOutlinedIcon  /> */}Login</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

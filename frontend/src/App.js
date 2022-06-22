import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Callback from "./pages/Callback";
import Protected from "./components/Protected";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Program from "./pages/Program";
import Performance from "./pages/Performance";
import Place from "./pages/Place";
import Actor from "./pages/Actor";
import About from "./pages/About";
import BackPf from "./pages/BackPf";
import BackPlace from "./pages/BackPlace";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/place" element={<Place />} />
        <Route path="/actor" element={<Actor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route path="/callback" element={<Callback />} />
        <Route
          path="/backpf"
          element={
            <Protected key={1}>
              <BackPf />
            </Protected>
          }
        />
        <Route
          path="/backplace"
          element={
            <Protected key={2}>
              <BackPlace />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

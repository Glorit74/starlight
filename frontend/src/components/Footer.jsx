import React from "react";
import styled from "styled-components";

function Footer() {
  return (
    <div>
      <Myparallelogramma>Valami</Myparallelogramma>
    </div>
  );
}

export default Footer;

const Myparallelogramma = styled.div`
    z-index: 0,
    position: "relative",
    left: "-40px",
    width: "40vw",
    height: "150px",
    transform: "skew(-30deg)",
    background-color: "#1a1a1d",
    border: "1px solid red",
    color: "#ecdce1",
	&:before {
		content:"KÖVESSEN MINKET:"
	}`;

import React from "react";
import Navbar from "../components/Navbar";
import Error from "../assets/Ilustration.png";

export default function Notfound() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <Navbar></Navbar>
      <img src={Error} alt="...404" />
    </div>
  );
}

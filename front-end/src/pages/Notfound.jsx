import React from "react";
import Error from "../assets/Ilustration.png";

export default function Notfound() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <img src={Error} alt="...404" />
    </div>
  );
}

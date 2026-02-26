import React from "react";
import NavbarLoggedOut from "../components/NavbarLoggedOut";
import HomeImg from "../assets/HomeImg.png";

export default function Home() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <NavbarLoggedOut></NavbarLoggedOut>
      <img src={HomeImg} alt="...404" style={{ marginTop: "30px" }} />
    </div>
  );
}

import React from "react";
import Navbar from "../components/Navbar";

export default function Price() {
  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", fontFamily: "'Segoe UI',sans-serif" }}>
      <Navbar title="Price List Editor" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h1 style={{ color: "#1A1510", fontSize: "2rem", marginBottom: 12 }}>💰 Rate Calculator</h1>
        <p style={{ color: "#8A7A60", fontSize: 16 }}>Coming very soon! You will be able to edit the website services list right here.</p>
      </div>
    </div>
  );
}

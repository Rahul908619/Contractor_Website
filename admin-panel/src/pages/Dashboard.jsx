import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [stats, setStats] = useState({ gallery: 0, enquiries: 0, services: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gRes, eRes, sRes] = await Promise.all([
          axios.get("/gallery").catch(()=>({data:{data:[]}})),
          axios.get("/enquiry").catch(()=>({data:{data:[]}})),
          axios.get("/services").catch(()=>({data:{data:[]}}))
        ]);
        setStats({
          gallery: (gRes.data.data || []).length,
          enquiries: (eRes.data.data || []).length,
          services: (sRes.data.data || []).length,
        });
      } catch (err) {}
    };
    fetchStats();
  }, []);

  const cards = [
    { title: "Manage Gallery", desc: "Upload and delete project photos & videos across all categories.", icon: "🖼️", link: "/gallery", count: stats.gallery, c: "Photos/Videos" },
    { title: "View Enquiries", desc: "Check quote requests and fast contact messages from customers.", icon: "📭", link: "/enquiries", count: stats.enquiries, c: "Messages" },
    { title: "Edit Services", desc: "Add or modify the main building services offered.", icon: "🛠️", link: "/services", count: stats.services, c: "Active Services" },
    { title: "Update Pricing", desc: "Update the live PDF table containing unit rates.", icon: "💰", link: "/price", count: "Live", c: "Price List" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F2EC", fontFamily: "'Segoe UI',sans-serif" }}>
      <Navbar title="Admin Dashboard" />
      
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "2rem", color: "#0F172A", margin: "0 0 8px", fontWeight: 800 }}>
          Welcome back to the SK Dashboard
        </h2>
        <p style={{ color: "#475569", fontSize: 16, marginBottom: "3rem" }}>
          Select a module below to update your public website in real-time.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
          {cards.map(c => (
            <Link key={c.link} to={c.link} style={{
              background: "#fff", border: "1px solid #E2E8F0", borderRadius: 12,
              padding: "1.8rem", textDecoration: "none", color: "inherit",
              boxShadow: "0 4px 15px rgba(0,0,0,0.03)", transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)", display: "block"
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 10px 25px rgba(79, 70, 229, 0.15)", transform = "translateY(-4px)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.03)", transform = "translateY(0)"}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ fontSize: 36 }}>{c.icon}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#4F46E5", fontSize: 24, fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>{c.count}</div>
                  <div style={{ color: "#64748B", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{c.c}</div>
                </div>
              </div>
              <h3 style={{ fontSize: 18, color: "#0F172A", margin: "0 0 8px", fontWeight: 700 }}>{c.title}</h3>
              <p style={{ color: "#475569", fontSize: 14, lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              
              <div style={{ marginTop: 20, color: "#4F46E5", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                Open Module →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

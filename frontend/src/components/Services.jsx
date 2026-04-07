import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const FALLBACK_SERVICES = [
  { _id: 'f1', title: "Premium Marble Flooring", description: "Experience the timeless elegance of Italian Carrara, pristine Makrana, and exotic imported marble.", icon: "🏛️" },
  { _id: 'f2', title: "Luxury Bathroom Design", description: "We construct spa-like sanctuary bathrooms from scratch.", icon: "🚿" },
  { _id: 'f3', title: "Precision Tile Installation", description: "Flawless laying of large-format porcelain, ceramic, and vitrified tiles.", icon: "🔲" },
  { _id: 'f4', title: "Commercial Architecture", description: "Heavy-traffic resilient stone flooring for hotel lobbies, corporate offices, and luxury showrooms.", icon: "🏢" },
  { _id: 'f5', title: "Staircase & Steps", description: "Elevate your multi-level space with solid block granite steps, floating cantilevered marble treads, or classic open-riser staircases.", icon: "🪜" },
  { _id: 'f6', title: "Bespoke Feature Walls", description: "Turn blank walls into art. We specialize in book-matched onyx backdrops, TV unit wall cladding, and 3D stone tiles.", icon: "✨" },
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    let active = true;
    axios.get("/services", { timeout: 2000 })
      .then(res => {
        if (!active) return;
        const data = res.data?.data || res.data || [];
        setServices(Array.isArray(data) && data.length > 0 ? data : FALLBACK_SERVICES);
      })
      .catch(() => {
        if (active) setServices(FALLBACK_SERVICES);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAFAF5', overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1A1510 0%, #2A2218 100%)', padding: '6rem 2rem', position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.15, background: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80') center/cover" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #1A1510, transparent)" }}/>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} 
          style={{ maxWidth: 1280, margin: '0 auto', textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, textTransform: 'uppercase', color: '#E8C060', marginBottom: 16 }}>
            Master Craftsmanship
          </div>
          <h1 style={{ fontFamily: 'Georgia,serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#fff', margin: 0, textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
            Our Specialties
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 18, maxWidth: 620, margin: "18px auto 0", lineHeight: 1.8 }}>
            With over 20 years of legacy in Nashik, we undertake complete material procurement, precise cutting, diamond polishing, and flawless installation.
          </p>
        </motion.div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '5rem 2rem' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))', gap: 30 }}>
            <p>Loading services...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(350px,1fr))', gap: 30 }}>
            {services.map((s, i) => (
              <motion.div key={s._id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(196,152,42,0.12)" }}
                style={{ background: '#fff', border: '1px solid rgba(196,152,42,0.15)',
                  borderRadius: 12, overflow: 'hidden', cursor: 'pointer', display: "flex", flexDirection: "column" }}>
                
                <div style={{ height: 160, background: `radial-gradient(circle at top left, #2A2218, #1A1510)`, display: "flex", alignItems: "flex-end", padding: "1.5rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ color: "rgba(196,152,42,0.6)", fontSize: 50, lineHeight: 0.8, position: "relative", zIndex: 1 }}>{s.icon || "◈"}</div>
                  {s.image && <img src={s.image} alt={s.title} style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3}} />}
                </div>

                <div style={{ padding: '2rem 1.8rem', display: "flex", flexDirection: "column", flexGrow: 1 }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#1A1510', margin: '0 0 12px', fontWeight: 700 }}>
                    {s.title}
                  </h3>
                  <p style={{ color: '#6B5F45', fontSize: 14, lineHeight: 1.8, margin: 0, flexGrow: 1 }}>
                    {s.description}
                  </p>
                  <Link to="/contact" style={{ marginTop: "1.8rem", color: "#C4982A", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, textDecoration: "none", display: "inline-block" }}>
                    Talk to Expert →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

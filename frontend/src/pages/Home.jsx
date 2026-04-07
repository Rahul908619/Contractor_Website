import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";

// Contact info
const PHONE1 = "8619181791", PHONE2 = "9028933305";
const WA = `https://wa.me/91${PHONE1}?text=Hi%2C%20I%20saw%20your%20website%20and%20need%20flooring%20work`;

// Components
function Counter({ target, suffix = "", duration = 1500 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null), started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = null;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setVal(Math.floor(progress * target));
          if (progress < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    obs.observe(el); return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const TRUST_IMG = [
  "https://www.krishnacivilwork.in/assets/images/a5.jpg",
  "https://previews.123rf.com/images/liudmilachernetska/liudmilachernetska2308/liudmilachernetska230875365/211107833-worker-measuring-tiles-for-installation-closeup-view.jpg",
  "https://content.jdmagicbox.com/v2/comp/bangalore/x2/080pxx80.xx80.221229134024.y6x2/catalogue/nvisher-marble-polish-works-bangalore-marble-polishing-services-jgc3kvagrj.jpg"
];

const BEFORE_AFTER = [
  { before: "https://i.pinimg.com/736x/e2/10/b7/e210b7fc3285ec3b3fdb1aa86138f55f.jpg", after: "https://static.wixstatic.com/media/65c57d_2a215e130f74431e9de0f4a16a316f5b~mv2.jpg/v1/fill/w_2500%2Ch_1666%2Cal_c/65c57d_2a215e130f74431e9de0f4a16a316f5b~mv2.jpg", desc: "Outdated kitchen transformed with premium granite tops & pristine marble floors." },
  { before: "https://hips.hearstapps.com/hmg-prod/images/hb-edit-news-template-social-image-1-687e8cbef2f73.png", after: "https://www.krishnacivilwork.in/assets/images/a5.jpg", desc: "Old mosaic bathroom completely modernized with seamless imported tiles." },
];

const REVIEWS = [
  { text: "Bhai kya finishing di hai floor ko! Marble lagne ke baad pura ghar luxurious dikh raha hai. Exactly on time completion.", author: "Rajesh Sharma", loc: "Pune" },
  { text: "Very transparent pricing. No hidden costs. The team was highly skilled and cleaned up perfectly after the work.", author: "Sneha Patil", loc: "Nashik" },
  { text: "Italian marble perfectly aligned. Shimbhu ji personally supervised the work. Highly recommended for premium homes.", author: "Vikas Singh", loc: "Jaipur" },
];

const SERVICES_DATA = [
  { icon: "🏛️", title: "Marble Flooring", desc: "Premium Italian, Makrana & imported marble. Precision cutting, laying, and mirror polishing." },
  { icon: "🚿", title: "Bathroom Design", desc: "End-to-end luxury bathrooms — vanities, shower areas, walls, and custom anti-slip floors." },
  { icon: "🔲", title: "Tile Installation", desc: "Vitrified, ceramic, porcelain and mosaic tiling. Zero hollowness, perfect alignment." },
  { icon: "🏢", title: "Commercial Spaces", desc: "Heavy-duty flooring for showrooms, hotels, malls, and commercial buildings." },
  { icon: "🪜", title: "Staircase Work", desc: "Premium granite & marble staircases — open-riser, classic designs with anti-skid grooves." },
  { icon: "🖼️", title: "Feature Walls", desc: "Decorative marble walls, onyx TV backdrops, and 3D tile patterns for living rooms." },
];

const WHY_US_IMAGES = [
  "https://blog.nobrokerage.com/_next/image?q=75&url=https%3A%2F%2Fpub-c809614ac2b345feaff5bc1dd8a9790b.r2.dev%2F1766663859344-504c5b8d5e5cee64.jpg&w=2048",
  "https://m.media-amazon.com/images/I/61jCOBPnp3L._AC_UF1000%2C1000_QL80_.jpg"
];

const FOUNDER_IMG = "/founder.jpg";

export default function Home() {
  const [bgImage, setBgImage] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", area: "", service: "Marble Work", message: "" });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setBgImage(p => (p + 1) % TRUST_IMG.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      const msg = `Service: ${formData.service}\nArea: ${formData.area}\nMessage: ${formData.message}`;
      await axios.post("/enquiry", { name: formData.name, phone: formData.phone, message: msg });
      setFormStatus("success");
      setFormData({ name: "", phone: "", area: "", service: "Marble Work", message: "" });
    } catch {
      setFormStatus("error");
    }
    setTimeout(() => setFormStatus(null), 4000);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#FAFAF5", color: "#1A1510", overflowX: "hidden" }}>

      {/* 1. HERO & TOP TRUST BAR */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Background Slider */}
        {TRUST_IMG.map((img, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0, zIndex: 0,
            backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center",
            opacity: i === bgImage ? 0.35 : 0, transition: "opacity 1.5s ease"
          }} />
        ))}
        {/* Gradient Overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(16,13,6,0.9) 0%, rgba(30,22,16,0.75) 100%)" }} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", paddingTop: "5rem", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem", width: "100%", display: "grid", gridTemplateColumns: "1fr 400px", gap: "4rem", alignItems: "center" }}>
            
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, background: "rgba(196,152,42,0.15)", border: "1px solid rgba(196,152,42,0.4)", borderRadius: 30, padding: "8px 20px", fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "#E8C060", fontWeight: 700 }}>
                ★ Best Tile & Marble Contractor in MH & RJ
              </div>
              <h1 style={{ fontFamily: "Georgia,serif", fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 700, color: "#F5F0E6", lineHeight: 1.1, marginBottom: "1.5rem" }}>
                Flawless Floors.<br />
                <span style={{ color: "#C4982A" }}>Zero Compromise.</span>
              </h1>
              <p style={{ color: "#C8B8A0", fontSize: 18, lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 600 }}>
                Stop dealing with unprofessional labor. We deliver <strong style={{ color: "#F5F0E6" }}>precision marble polishing, granite cutting, and perfect tile alignment</strong>. Guaranteed on-time delivery with no hidden costs.
              </p>
              
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: "2rem" }}>
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", borderRadius: 4, padding: "16px 36px", fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(37,211,102,.3)" }}>
                  💬 WhatsApp Us Now
                </a>
                <a href={`tel:${PHONE1}`}
                  style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#C4982A", color: "#fff", borderRadius: 4, padding: "16px 36px", fontSize: 16, fontWeight: 700, textDecoration: "none", boxShadow: "0 8px 24px rgba(196,152,42,.3)" }}>
                  📞 Talk to Expert
                </a>
              </div>

              {/* Trust Bar inline */}
              <div style={{ display: "flex", gap: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem" }}>
                {[
                  { n: 20, l: "Years Exp.", s: "+" },
                  { n: 500, l: "Projects Done", s: "+" },
                  { n: 100, l: "On-Time", s: "%" }
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "2rem", fontWeight: 700, color: "#fff" }}>
                      <Counter target={s.n} suffix={s.s} />
                    </div>
                    <div style={{ color: "#C4982A", fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Quick Lead Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", border: "1px solid rgba(196,152,42,0.3)", borderRadius: 12, padding: "2.5rem", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.6rem", color: "#fff", margin: 0 }}>Get a Custom Estimate</h3>
                <p style={{ color: "#A89880", fontSize: 13, marginTop: 6 }}>Response within 24 hours!</p>
              </div>
              <form onSubmit={handleForm} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 4, fontFamily: "inherit" }} />
                <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 4, fontFamily: "inherit" }} />
                <div style={{ display: "flex", gap: 14 }}>
                  <input type="text" placeholder="Location/City" required value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })}
                    style={{ width: "50%", padding: "14px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 4, fontFamily: "inherit" }} />
                  <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}
                    style={{ width: "50%", padding: "14px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 4, fontFamily: "inherit", color: "#1A1510" }}>
                    <option>Marble Work</option>
                    <option>Tile Fitting</option>
                    <option>Granite / Stairs</option>
                    <option>Full Contract</option>
                  </select>
                </div>
                <textarea placeholder="Briefly describe your project..." rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{ width: "100%", padding: "14px", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: 4, fontFamily: "inherit", resize: "none" }} />
                <button disabled={formStatus === "sending"} style={{ width: "100%", background: "#C4982A", color: "#fff", border: "none", borderRadius: 4, padding: "16px", fontSize: 16, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: 1 }}>
                  {formStatus === "sending" ? "Sending..." : formStatus === "success" ? "✓ Request Received" : formStatus === "error" ? "❌ Error, Try WA" : "Request Free Site Visit"}
                </button>
              </form>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* STRIP: Client Trust Bar */}
      <div style={{ background: "#C4982A", padding: "1.5rem 0", color: "#fff", display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
        {["✔ 20+ Years Experience", "✔ 500+ Projects Completed", "✔ Skilled Core Labour", "✔ 100% On-Time Delivery"].map(t => (
          <span key={t} style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>{t}</span>
        ))}
      </div>

      {/* 2. BEFORE & AFTER GALLERY (GAME CHANGER) */}
      <section style={{ padding: "6rem 2rem", background: "#1A1510" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#C4982A", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Real Transformations</p>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem", fontWeight: 700, color: "#fff", margin: 0 }}>Before & After</h2>
            <p style={{ color: "#A89880", fontSize: 16, marginTop: 12 }}>See the dramatic difference precision craftsmanship makes.</p>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            {BEFORE_AFTER.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
                style={{ background: "#2A2218", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(196,152,42,0.3)", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: 320 }}>
                  <div style={{ position: "relative" }}>
                    <img src={item.before} alt="Before" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%) contrast(80%)" }} />
                    <span style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.7)", color: "#fff", padding: "4px 12px", fontSize: 11, fontWeight: 700, borderRadius: 20 }}>BEFORE</span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <img src={item.after} alt="After" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <span style={{ position: "absolute", top: 12, right: 12, background: "#C4982A", color: "#fff", padding: "4px 12px", fontSize: 11, fontWeight: 700, borderRadius: 20, boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>AFTER</span>
                  </div>
                </div>
                <div style={{ padding: "1.5rem", textAlign: "center" }}>
                  <p style={{ color: "#D8C8B0", fontSize: 16, margin: 0, fontFamily: "Georgia,serif", fontStyle: "italic" }}>"{item.desc}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/gallery" style={{ display: "inline-block", border: "2px solid #C4982A", color: "#C4982A", padding: "14px 32px", fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, borderRadius: 4, textDecoration: "none", transition: "0.3s" }}>
              View Our Work Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* 3. REAL WORK & LOCATIONS */}
      <section style={{ padding: "6rem 2rem", background: "#F5F2EC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#C4982A", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Our Portfolio</p>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem", fontWeight: 700, color: "#1A1510", margin: 0 }}>Recent Projects</h2>
            <p style={{ color: "#6A5A40", fontSize: 16, marginTop: 12 }}>We don't use stock photos. This is our actual hard work.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {[
              { img: "https://content.jdmagicbox.com/v2/comp/hyderabad/n6/040pxx40.xx40.230627114619.w3n6/catalogue/svr-merble-polishing-works-toli-chowki-hyderabad-marble-polishing-services-518suqwtqn.jpg", title: "Diamond Marble Polishing", loc: "Nashik" },
              { img: "https://www.krishnacivilwork.in/assets/images/a5.jpg", title: "Vitrified Tile Installation", loc: "Pune" },
              { img: "https://previews.123rf.com/images/liudmilachernetska/liudmilachernetska2308/liudmilachernetska230875365/211107833-worker-measuring-tiles-for-installation-closeup-view.jpg", title: "Premium Flooring Contract", loc: "Jaipur" }
            ].map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.06)", border: "1px solid rgba(196,152,42,0.1)" }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", height: 260, objectFit: "cover" }} />
                <div style={{ padding: "1.5rem", borderTop: "3px solid #C4982A" }}>
                  <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", color: "#1A1510", margin: "0 0 8px" }}>{p.title}</h3>
                  <div style={{ color: "#8A7A60", fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>📍 {p.loc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (PSYCHOLOGY SECTION) */}
      <section style={{ padding: "6rem 2rem", background: "#FAFAF5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ color: "#C4982A", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>The SK Difference</p>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem", fontWeight: 700, color: "#1A1510", margin: "0 0 24px", lineHeight: 1.2 }}>
              Why Homeowners & Builders Trust Us
            </h2>
            <p style={{ color: "#6A5A40", fontSize: 16, lineHeight: 1.8, marginBottom: "2rem" }}>
              In the construction industry, delays and poor finishing are the biggest headaches. We solve that. We bring <strong style={{ color: "#1A1510" }}>100% accountability, transparent rates, and master-level craftsmanship</strong> to your doorstep.
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: "🎯", title: "Precision Work", desc: "Perfect leveling, no air gaps (hollowness), and hairline joints." },
                { icon: "👨‍🔧", title: "Experienced Team", desc: "Our core team has been doing this for over 20 years. No amateurs." },
                { icon: "💎", title: "Quality Materials", desc: "We use top-grade cement, epoxy, and diamond polish for longevity." },
                { icon: "🤝", title: "Transparent Pricing", desc: "The custom estimate we give is the final price. No hidden surprise charges." }
              ].map((b, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 24, background: "#F5F0E6", width: 50, height: 50, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{b.icon}</div>
                  <div>
                    <div style={{ fontFamily: "Georgia,serif", fontSize: "1.3rem", fontWeight: 700, color: "#1A1510", marginBottom: 4 }}>{b.title}</div>
                    <div style={{ color: "#6A5A40", fontSize: 14 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "3rem" }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1A1510", color: "#fff", borderRadius: 4, padding: "14px 32px", fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: 1 }}>
                Talk to an Expert →
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: "relative" }}>
            <img src={WHY_US_IMAGES[0]} alt="Marble Polishing Machine" style={{ width: "90%", borderRadius: 12, boxShadow: "0 20px 40px rgba(0,0,0,0.15)", position: "relative", zIndex: 2 }} />
            <img src={WHY_US_IMAGES[1]} alt="Tiles" style={{ width: "50%", position: "absolute", bottom: -40, right: -20, borderRadius: 12, border: "8px solid #FAFAF5", boxShadow: "0 20px 40px rgba(0,0,0,0.2)", zIndex: 3 }} />
            {/* Decorative element */}
            <div style={{ position: "absolute", top: -20, left: -20, width: "90%", height: "100%", border: "2px solid #C4982A", borderRadius: 12, zIndex: 1 }} />
          </motion.div>

        </div>
      </section>

      {/* 5. LOCATIONS & SEO */}
      <section style={{ background: "#C4982A", padding: "4rem 2rem", color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem" }}>Premium Tile & Marble Contractor in Maharashtra & Rajasthan</h2>
          <p style={{ fontSize: 16, maxWidth: 800, margin: "0 auto 2rem", lineHeight: 1.6, color: "rgba(255,255,255,0.9)" }}>
            We provide residential and commercial flooring, bathroom remodeling, and marble polishing services across major cities.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            {["Nashik", "Pune", "Mumbai", "Thane", "Jaipur", "Jodhpur", "Udaipur", "Kota"].map(city => (
              <span key={city} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px", borderRadius: 30, fontSize: 14, fontWeight: 600 }}>
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SERVICES (Quick List) */}
      <section style={{ padding: "6rem 2rem", background: "#FAFAF5" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem", fontWeight: 700, color: "#1A1510", margin: "0 0 16px" }}>Our Core Services</h2>
            <Link to="/services" style={{ color: "#C4982A", fontWeight: 700, textDecoration: "none", fontSize: 16 }}>View All Details →</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {SERVICES_DATA.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                style={{ background: "#fff", padding: "2rem", borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.04)", border: "1px solid #EAE5D8" }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "Georgia,serif", fontSize: "1.4rem", margin: "0 0 10px", color: "#1A1510" }}>{s.title}</h3>
                <p style={{ color: "#6A5A40", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FOUNDER STORY (Emotional Connect) */}
      <section style={{ padding: "6rem 2rem", background: "#1A1510", color: "#fff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <img src={FOUNDER_IMG} alt="Shimbhu Dayal Kumawat" style={{ width: "100%", borderRadius: "10px 50px 10px 50px", border: "4px solid #C4982A", boxShadow: "0 20px 40px rgba(196,152,42,0.2)" }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ color: "#C4982A", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>The Face Behind the Brand</p>
            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.5rem", fontWeight: 700, margin: "0 0 20px" }}>Shimbhu Dayal Kumawat</h2>
            <div style={{ background: "rgba(196,152,42,0.1)", padding: "1.5rem", borderRadius: 8, borderLeft: "4px solid #C4982A", marginBottom: "2rem" }}>
              <p style={{ fontSize: 16, lineHeight: 1.8, margin: 0, fontStyle: "italic", color: "#E8C060" }}>
                "I started SK Contractor with a single belief: Give the client exactly what they paid for — no shortcuts. Today, we are trusted by hundreds of families because we treat every home like our own."
              </p>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#A89880", marginBottom: "2rem" }}>
              What started as a small team of passionate workers over 20 years ago has now grown into a recognized contracting firm across two states. His hands-on experience and strict quality control ensure that every floor, wall, and staircase is literally built to last a lifetime.
            </p>
            <Link to="/about" style={{ color: "#C4982A", fontWeight: 700, textDecoration: "none", fontSize: 15, borderBottom: "2px solid #C4982A", paddingBottom: 4 }}>Read Full Story</Link>
          </motion.div>
        </div>
      </section>

      {/* 8. REVIEWS */}
      <section style={{ padding: "6rem 2rem", background: "#F5F2EC" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#C4982A", fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 10, fontWeight: 700 }}>Word of Mouth</p>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "2.8rem", fontWeight: 700, color: "#1A1510", margin: "0 0 3rem" }}>What People Say</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
            {REVIEWS.map((r, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "#fff", padding: "2.5rem", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid rgba(196,152,42,0.2)" }}>
                <div style={{ color: "#C4982A", fontSize: 24, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
                <p style={{ color: "#4A3A28", fontSize: 16, lineHeight: 1.7, fontStyle: "italic", marginBottom: "2rem" }}>"{r.text}"</p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, background: "#C4982A", borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 18 }}>
                    {r.author.charAt(0)}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700, color: "#1A1510" }}>{r.author}</div>
                    <div style={{ fontSize: 12, color: "#8A7A60", textTransform: "uppercase", letterSpacing: 1 }}>{r.loc}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STRONG FINAL CTA */}
      <section style={{ padding: "6rem 2rem", background: "url(https://www.krishnacivilwork.in/assets/images/a5.jpg) center/cover", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(26,18,8,0.92)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto", textAlign: "center", color: "#fff" }}>
          <h2 style={{ fontFamily: "Georgia,serif", fontSize: "3rem", fontWeight: 700, marginBottom: "1.5rem" }}>Need Expert Flooring Work?</h2>
          <p style={{ fontSize: 18, color: "#C8B8A0", marginBottom: "3rem", lineHeight: 1.6 }}>
            Don't risk your expensive marble with inexperienced labor. Get it done right the first time with SK Contractor.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <Link to="/contact" style={{ background: "#C4982A", color: "#fff", padding: "18px 40px", borderRadius: 4, fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none", boxShadow: "0 10px 30px rgba(196,152,42,0.4)" }}>
              Get Free Site Visit
            </Link>
            <a href={`tel:${PHONE1}`} style={{ background: "transparent", border: "2px solid #fff", color: "#fff", padding: "18px 40px", borderRadius: 4, fontSize: 16, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, textDecoration: "none" }}>
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

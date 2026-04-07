import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Home     from "./pages/Home";
import Gallery  from "./pages/Gallery";
import Contact  from "./pages/Contact";
import Services from "./components/Services";
import About    from "./components/About";
import Chatbot  from "./components/Chatbot";
import Pricing  from "./pages/Pricing";
import './index.css';

function SKLogo() {
  return (
    <Link to="/" style={{textDecoration:"none", display:"flex", alignItems:"center", gap:14, perspective: 1000}}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        whileHover={{ scale: 1.2, filter: "drop-shadow(0 0 25px rgba(90,200,250,0.8))" }}
        style={{ transformStyle: "preserve-3d", display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <svg width="48" height="48" viewBox="0 0 64 64" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="contractorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111111" />
              <stop offset="20%" stopColor="#D4AF37" />
              <stop offset="40%" stopColor="#FF3B30" />
              <stop offset="60%" stopColor="#4CD964" />
              <stop offset="80%" stopColor="#5AC8FA" />
              <stop offset="100%" stopColor="#5856D6" />
            </linearGradient>
            <linearGradient id="slateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A4A4A" />
              <stop offset="100%" stopColor="#1A1A1A" />
            </linearGradient>
            <filter id="goldGlow">
               <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
               </feMerge>
            </filter>
          </defs>
          
          <motion.path
            d="M32 2 L38 12 L50 14 L48 26 L56 34 L48 42 L50 54 L38 52 L32 62 L26 52 L14 54 L16 42 L8 34 L16 26 L14 14 L26 12 Z"
            fill="none" stroke="url(#contractorGrad)" strokeWidth="1.5"
            strokeDasharray="4 4"
            filter="url(#goldGlow)"
          />
          <path
            d="M32 2 L38 12 L50 14 L48 26 L56 34 L48 42 L50 54 L38 52 L32 62 L26 52 L14 54 L16 42 L8 34 L16 26 L14 14 L26 12 Z"
            fill="url(#slateGrad)" fillOpacity="0.1" stroke="url(#slateGrad)" strokeWidth="0.5"
          />

          <motion.polygon 
            animate={{ rotate: -720 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "32px 32px" }}
            points="32,10 54,48 10,48" 
            fill="none" stroke="url(#contractorGrad)" strokeWidth="2"
          />
          <motion.polygon 
            animate={{ rotate: 720 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "32px 32px" }}
            points="32,54 10,16 54,16" 
            fill="none" stroke="url(#slateGrad)" strokeWidth="2"
          />

          <circle cx="32" cy="32" r="12" fill="url(#contractorGrad)" fillOpacity="0.15" stroke="url(#contractorGrad)" strokeWidth="1.5"/>
          <text x="32" y="37" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontFamily="Georgia,serif" fontWeight="900" letterSpacing="1">SK</text>
        </svg>
      </motion.div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{fontFamily:"'Inter', sans-serif", fontWeight:800, fontSize:18, color: "#FFFFFF", lineHeight:1.1, letterSpacing: -0.5}}>
          SK <span style={{
            background: "linear-gradient(90deg, #D4AF37, #FF3B30, #4CD964, #5AC8FA)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text", color: "transparent", display: "inline-block"
          }}>Contractor</span>
        </div>
        <div style={{fontSize:10, color: "#94A3B8", letterSpacing:3, textTransform:"uppercase", fontWeight: 700}}>Nashik • Premium</div>
      </div>
    </Link>
  );
}

const NAV=[{path:"/",label:"Home"},{path:"/services",label:"Services"},{path:"/gallery",label:"Gallery"},
  {path:"/pricing",label:"Pricing"},{path:"/about",label:"About"},{path:"/contact",label:"Contact"}];

function Navbar() {
  const [sc, setSc] = useState(false);
  const loc = useLocation();
  
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 50); 
    window.addEventListener("scroll", fn); 
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{
          position: "fixed", top: 15, zIndex: 100, width: "95%", maxWidth: 1280,
          background: sc ? "rgba(15, 23, 42, 0.95)" : "rgba(30, 41, 59, 0.8)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderRadius: 24,
          boxShadow: sc ? "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
          border: "1px solid rgba(255,255,255,0.1)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.6rem 1.5rem" }}>
          
          <SKLogo />

          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV.map((n, i) => {
              const hoverColors = ["#FF3B30", "#FF9500", "#4CD964", "#5AC8FA", "#007AFF", "#AF52DE"];
              const clr = hoverColors[i % hoverColors.length];
              return (
              <Link key={n.path} to={n.path} style={{ textDecoration: "none", position: "relative" }}>
                <motion.div
                  whileHover={{ scale: 1.1, color: clr, textShadow: `0 0 10px ${clr}` }}
                  style={{
                    fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase",
                    fontWeight: 800, color: loc.pathname === n.path ? clr : "#E2E8F0",
                    transition: "all 0.3s"
                  }}
                >
                  {n.label}
                </motion.div>
                {loc.pathname === n.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute", bottom: -6, left: 0, right: 0, height: 3,
                      background: clr,
                      borderRadius: 2,
                      boxShadow: `0 0 8px ${clr}`
                    }}
                  />
                )}
              </Link>
            )})}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(90,200,250,0.5)" }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "linear-gradient(135deg, #FF3B30, #5856D6)",
                  color: "#FFFFFF", borderRadius: 1e5, padding: "12px 24px", fontSize: 12, 
                  letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 800, textDecoration: "none",
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", border: "none"
                }}
              >
                Contact Us
              </motion.div>
            </Link>
          </div>

        </div>
      </motion.nav>
    </div>
  );
}

function FloatingButtons() {
  return (
    <div style={{position:"fixed",bottom:24,left:20,zIndex:50,display:"flex",flexDirection:"column",gap:10}}>
      <a href="tel:8619181791" style={{width:50,height:50,background:"#1A1510",color:"#fff",borderRadius:"50%",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 16px rgba(0,0,0,0.3)",textDecoration:"none",fontSize:20,
        border:"2px solid rgba(196,152,42,0.4)"}}>📞</a>
      <a href="https://wa.me/918619181791?text=Hi,%20I%20need%20marble/tile%20work" target="_blank" rel="noopener noreferrer"
        style={{width:50,height:50,background:"#25D366",color:"#fff",borderRadius:"50%",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 4px 16px rgba(37,211,102,0.4)",textDecoration:"none",fontSize:20}}>💬</a>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{background:"#1A1208",borderTop:"1px solid rgba(196,152,42,0.2)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"3rem 2rem 1.5rem",
        display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1.5fr",gap:36}}>
        <div>
          <SKLogo/>
          <p style={{color:"#6B5F45",fontSize:13,lineHeight:1.8,marginTop:14,maxWidth:280}}>
            Nashik's trusted premium contractors. 20+ years of crafting spaces that last.
          </p>
        </div>
        <div>
          <div style={{color:"#C4982A",fontSize:10,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Pages</div>
          {NAV.map(n=>(
            <Link key={n.path} to={n.path} style={{display:"block",color:"#6B5F45",fontSize:13,marginBottom:8,textDecoration:"none"}}>{n.label}</Link>
          ))}
        </div>
        <div>
          <div style={{color:"#C4982A",fontSize:10,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Services</div>
          {["Marble Flooring","Bathroom Design","Commercial Work","Staircases","Feature Walls"].map(s=>(
            <Link key={s} to="/services" style={{display:"block",color:"#6B5F45",fontSize:13,marginBottom:8,textDecoration:"none"}}>{s}</Link>
          ))}
        </div>
        <div>
          <div style={{color:"#C4982A",fontSize:10,letterSpacing:3,textTransform:"uppercase",marginBottom:14}}>Contact</div>
          {[["📞","8619181791 / 9028933305"],["📧","SkTiles&marbles@gmail.com"],["📍","Takli Road, Taphovan, Nashik, MH"],["⏰","Mon–Sat: 9AM – 7PM"]].map(([ic,v],i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:10,color:"#6B5F45",fontSize:13}}>
              <span>{ic}</span><span>{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"1rem 2rem",borderTop:"1px solid rgba(196,152,42,0.12)",display:"flex",justifyContent:"space-between"}}>
        <span style={{color:"#3A3020",fontSize:12}}>© 2024 SK Contractor. All rights reserved.</span>
        <span style={{color:"#3A3020",fontSize:12}}>Crafted with pride in Nashik</span>
      </div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    document.body.style.background = "#FAF7F0";
    document.body.style.color = "#1A1510";
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Chatbot/>
      <FloatingButtons/>
      <main style={{minHeight:"100vh",overflowX:"hidden"}}>
        <Routes>
          <Route path="/"         element={<Home/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/gallery"  element={<Gallery/>}/>
          <Route path="/pricing"  element={<Pricing/>}/>
          <Route path="/about"    element={<About/>}/>
          <Route path="/contact"  element={<Contact/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

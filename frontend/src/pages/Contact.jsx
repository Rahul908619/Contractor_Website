import { useState } from "react";
import { motion } from "framer-motion";
import axios from "../api/axios";

const PHONE1 = "8619181791";
const PHONE2 = "9028933305";
const WA = `https://wa.me/91${PHONE1}?text=Hi%2C%20I%20need%20marble%2Ftile%20work%20done`;

const SERVICES = [
  "Marble Flooring","Bathroom Design","Tile Installation",
  "Staircase Work","Commercial Interior","Feature Walls",
  "Granite Countertop","Outdoor / Parking Tiles","Other",
];

const BUDGETS = ["Under ₹50,000","₹50,000 – ₹1,50,000","₹1,50,000 – ₹5,00,000","₹5,00,000+","Not sure yet"];

export default function Contact() {
  const [form,setForm]=useState({name:"",phone:"",email:"",service:"",budget:"",area:"",message:""});
  const [sent,setSent]=useState(false);
  const [busy,setBusy]=useState(false);
  const [err, setErr] =useState("");

  const update = k => e => setForm(f=>({...f,[k]:e.target.value}));

  const submit = async e => {
    e.preventDefault();
    setErr("");
    if(!form.name||!form.phone){setErr("Name and phone are required.");return;}
    setBusy(true);
    try {
      await axios.post("/enquiry",{
        name:form.name, phone:form.phone,
        message:`Service: ${form.service||"Not specified"}\nBudget: ${form.budget||"Not specified"}\nArea: ${form.area||"Not specified"}\nEmail: ${form.email||"Not provided"}\nMessage: ${form.message}`,
      });
      setSent(true);
    } catch {
      setErr("Failed to send. Please call us directly at "+PHONE1+".");
    } finally { setBusy(false); }
  };

  return (
    <div style={{paddingTop:"5rem",minHeight:"100vh",background:"#0E0C08",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>

      {/* Hero */}
      <div style={{position:"relative",overflow:"hidden",padding:"5rem 2rem 4rem",borderBottom:"1px solid rgba(196,152,42,0.12)",
        background:"url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80') center/cover no-repeat"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg, rgba(14,12,8,0.92) 0%, rgba(14,12,8,0.7) 100%)"}}/>
        <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.06}} viewBox="0 0 1400 400" preserveAspectRatio="xMidYMid slice">
          <path d="M-100 200 Q400 100 800 220 T1500 180" stroke="#C4982A" strokeWidth="2" fill="none"/>
          <path d="M0 350 Q500 250 900 320 T1500 300" stroke="#C4982A" strokeWidth="1" fill="none"/>
        </svg>
        <div style={{maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1,textAlign:"center"}}>
          <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
            <p style={{color:"#C4982A",fontSize:10,letterSpacing:5,textTransform:"uppercase",marginBottom:14}}>Let's Talk</p>
            <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(2rem,4vw,3.2rem)",fontWeight:700,color:"#F5F0E6",margin:"0 0 14px"}}>
              Get Your <span style={{color:"#C4982A"}}>Free Site Visit</span>
            </h1>
            <p style={{color:"#6B5F45",fontSize:15,maxWidth:500,margin:"0 auto"}}>
              Fill the form below or reach us directly. We respond within a few hours.
            </p>
          </motion.div>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"3.5rem 2rem 5rem",display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:40,alignItems:"start"}}>

        {/* ── Contact info ── */}
        <motion.div initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{delay:.1}}>
          <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.6rem",color:"#E0C878",marginBottom:"1.4rem"}}>Reach Us Directly</h2>

          {/* Quick action cards */}
          <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:28}}>
            <a href={`tel:${PHONE1}`}
              style={{display:"flex",gap:14,alignItems:"center",background:"rgba(196,152,42,0.08)",
                border:"1px solid rgba(196,152,42,0.25)",borderRadius:8,padding:"1rem 1.2rem",
                textDecoration:"none",transition:"border-color 0.2s"}}
              onMouseOver={e=>e.currentTarget.style.borderColor="rgba(196,152,42,0.6)"}
              onMouseOut={e=>e.currentTarget.style.borderColor="rgba(196,152,42,0.25)"}>
              <div style={{width:44,height:44,background:"rgba(196,152,42,0.15)",borderRadius:"50%",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4982A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>    
              </div>
              <div>
                <div style={{fontSize:10,color:"#6B5F45",letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>Call Us</div>
                <div style={{color:"#C4982A",fontSize:15,fontWeight:600}}>{PHONE1}</div>
                <div style={{color:"#6B5F45",fontSize:12}}>Also: {PHONE2}</div>
              </div>
            </a>

            <a href={WA} target="_blank" rel="noopener noreferrer"
              style={{display:"flex",gap:14,alignItems:"center",background:"rgba(37,211,102,0.08)",
                border:"1px solid rgba(37,211,102,0.25)",borderRadius:8,padding:"1rem 1.2rem",
                textDecoration:"none",transition:"border-color 0.2s"}}
              onMouseOver={e=>e.currentTarget.style.borderColor="rgba(37,211,102,0.6)"}
              onMouseOut={e=>e.currentTarget.style.borderColor="rgba(37,211,102,0.25)"}>
              <div style={{width:44,height:44,background:"rgba(37,211,102,0.15)",borderRadius:"50%",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <div>
                <div style={{fontSize:10,color:"#6B5F45",letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>WhatsApp</div>
                <div style={{color:"#25D366",fontSize:15,fontWeight:600}}>Chat Instantly</div>
                <div style={{color:"#6B5F45",fontSize:12}}>+91-{PHONE1}</div>
              </div>
            </a>

            <div style={{display:"flex",gap:14,alignItems:"center",background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"1rem 1.2rem"}}>
              <div style={{width:44,height:44,background:"rgba(255,255,255,0.06)",borderRadius:"50%",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8B890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>    
              </div>
              <div>
                <div style={{fontSize:10,color:"#6B5F45",letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>Email</div>
                <div style={{color:"#C8B890",fontSize:14}}>SkTiles&marbles@gmail.com</div>
              </div>
            </div>

            <div style={{display:"flex",gap:14,alignItems:"center",background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,padding:"1rem 1.2rem"}}>
              <div style={{width:44,height:44,background:"rgba(255,255,255,0.06)",borderRadius:"50%",
                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8B890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>    
              </div>
              <div>
                <div style={{fontSize:10,color:"#6B5F45",letterSpacing:2,textTransform:"uppercase",marginBottom:2}}>Address</div>
                <div style={{color:"#C8B890",fontSize:14,lineHeight:1.5}}>Takli Road, Taphovan,<br/>Nashik, Maharashtra, India</div>
              </div>
            </div>
          </div>

          {/* Hours + area */}
          <div style={{background:"rgba(196,152,42,0.06)",border:"1px solid rgba(196,152,42,0.18)",
            borderRadius:8,padding:"1.2rem 1.4rem"}}>
            <div style={{color:"#C4982A",fontSize:12,fontWeight:700,marginBottom:12}}>⏰ Working Hours</div>
            <div style={{color:"#8A8070",fontSize:13,lineHeight:1.8}}>
              Monday – Saturday: <span style={{color:"#C8B890"}}>9:00 AM – 7:00 PM</span><br/>
              Sunday: <span style={{color:"#6B5F45"}}>Closed (Emergency contact ok)</span>
            </div>
            <div style={{borderTop:"1px solid rgba(196,152,42,0.15)",marginTop:12,paddingTop:12,
              color:"#8A8070",fontSize:13}}>
              🗺 We work across <span style={{color:"#C8B890"}}>Maharashtra & Rajasthan</span>
            </div>
          </div>
        </motion.div>

        {/* ── Quote form ── */}
        <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{delay:.15}}>
          {sent ? (
            <div style={{background:"rgba(196,152,42,0.06)",border:"1px solid rgba(196,152,42,0.25)",
              borderRadius:10,padding:"4rem 2rem",textAlign:"center"}}>
              <div style={{fontSize:60,marginBottom:20}}>✅</div>
              <h3 style={{fontFamily:"Georgia,serif",color:"#E0C878",fontSize:"1.6rem",marginBottom:12}}>
                Request Received!
              </h3>
              <p style={{color:"#8A8070",fontSize:15,lineHeight:1.8,marginBottom:"1.5rem"}}>
                Thank you <strong style={{color:"#C4982A"}}>{form.name}</strong>!<br/>
                We'll contact you at <strong style={{color:"#C4982A"}}>{form.phone}</strong> within a few hours to schedule your free site visit.
              </p>
              <button onClick={()=>{setForm({name:"",phone:"",email:"",service:"",budget:"",area:"",message:""});setSent(false);}}
                style={{background:"none",color:"#C4982A",border:"1px solid #C4982A",borderRadius:3,
                  padding:"11px 26px",fontSize:12,letterSpacing:2,textTransform:"uppercase",
                  cursor:"pointer",fontFamily:"inherit"}}>
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{background:"rgba(255,255,255,0.03)",
              border:"1px solid rgba(196,152,42,0.2)",borderRadius:10,padding:"2.5rem"}}>
              <h3 style={{fontFamily:"Georgia,serif",color:"#E0C878",fontSize:"1.5rem",marginBottom:"1.6rem"}}>
                Request Free Site Visit
              </h3>

              {/* Row 1 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <div>
                  <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Full Name *</label>
                  <input type="text" value={form.name} onChange={update("name")} placeholder="Your name" required
                    style={{...INP}}/>
                </div>
                <div>
                  <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Phone / WhatsApp *</label>
                  <input type="tel" value={form.phone} onChange={update("phone")} placeholder="+91-XXXXX-XXXXX" required
                    style={{...INP}}/>
                </div>
              </div>

              {/* Row 2 */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
                <div>
                  <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Email (optional)</label>
                  <input type="email" value={form.email} onChange={update("email")} placeholder="your@email.com"
                    style={{...INP}}/>
                </div>
                <div>
                  <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Area / City</label>
                  <input type="text" value={form.area} onChange={update("area")} placeholder="e.g. Nashik, Pune"
                    style={{...INP}}/>
                </div>
              </div>

              {/* Service */}
              <div style={{marginBottom:14}}>
                <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Service Required</label>
                <select value={form.service} onChange={update("service")} style={{...INP}}>
                  <option value="">-- Select a service --</option>
                  {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Budget */}
              <div style={{marginBottom:14}}>
                <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Approximate Budget</label>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {BUDGETS.map(b=>(
                    <button key={b} type="button" onClick={()=>setForm(f=>({...f,budget:b}))}
                      style={{background:form.budget===b?"#C4982A":"rgba(255,255,255,0.05)",
                        color:form.budget===b?"#fff":"#8A8070",
                        border:`1px solid ${form.budget===b?"#C4982A":"rgba(255,255,255,0.1)"}`,
                        borderRadius:3,padding:"6px 12px",fontSize:11,cursor:"pointer",
                        fontFamily:"inherit",transition:"all 0.2s"}}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div style={{marginBottom:20}}>
                <label style={{display:"block",color:"#6B5F45",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginBottom:7}}>Project Details</label>
                <textarea value={form.message} onChange={update("message")}
                  placeholder="Tell us about your project — room size, design ideas, timeline, etc."
                  rows={4}
                  style={{...INP, resize:"vertical"}}/>
              </div>

              {err&&<div style={{background:"rgba(198,40,40,0.12)",color:"#EF9A9A",border:"1px solid rgba(198,40,40,0.3)",borderRadius:6,padding:"10px 13px",fontSize:13,marginBottom:14}}>{err}</div>}

              <button type="submit" disabled={busy}
                style={{width:"100%",background:busy?"#6A6040":"#C4982A",color:"#fff",border:"none",
                  borderRadius:4,padding:"15px",fontSize:13,letterSpacing:2,textTransform:"uppercase",
                  fontWeight:700,cursor:busy?"not-allowed":"pointer",fontFamily:"inherit",
                  transition:"background 0.2s",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                {busy ? (
                  <><span style={{display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,.4)",
                    borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>Sending…</>
                ) : "Request Free Site Visit →"}
              </button>

              <p style={{textAlign:"center",color:"#4A4030",fontSize:11,marginTop:14,lineHeight:1.7}}>
                Or reach us directly: &nbsp;
                <a href={`tel:${PHONE1}`} style={{color:"#C4982A",textDecoration:"none"}}>{PHONE1}</a>
                &nbsp;/&nbsp;
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{color:"#25D366",textDecoration:"none"}}>WhatsApp</a>
              </p>
            </form>
          )}
        </motion.div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

const INP = {
  width:"100%", background:"rgba(255,255,255,0.05)",
  border:"1px solid rgba(255,255,255,0.1)", borderRadius:4,
  color:"#F0EAD8", padding:"11px 13px", fontSize:14,
  fontFamily:"inherit", outline:"none", boxSizing:"border-box",
  transition:"border-color 0.2s",
};

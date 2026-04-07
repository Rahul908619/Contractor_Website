import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

const TOKEN = () => localStorage.getItem("token");

function parseField(message, field) {
  if (!message) return "";
  for (const line of message.split("\n")) {
    if (line.toLowerCase().startsWith(field.toLowerCase() + ":"))
      return line.split(":").slice(1).join(":").trim();
  }
  return "";
}

function cleanMessage(message) {
  if (!message) return "";
  return message.split("\n")
    .filter(l => !l.match(/^(Service|Budget|Area|Email):/i))
    .join(" ").trim();
}

function formatDT(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", {
    day:"2-digit", month:"short", year:"numeric",
    hour:"2-digit", minute:"2-digit", hour12:true,
  });
}

function timeAgo(d) {
  if (!d) return "";
  const m = Math.floor((Date.now() - new Date(d)) / 60000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h/24)}d ago`;
}

export default function Enquiries() {
  const [data,    setData]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [sel,     setSel]     = useState(null);
  const [delId,   setDelId]   = useState(null);

  const fetch = () => {
    setLoading(true);
    axios.get("/enquiry", { headers: { Authorization:`Bearer ${TOKEN()}` } })
      .then(r => setData(r.data.data || r.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(fetch, []);

  const del = async id => {
    if (!window.confirm("Delete this enquiry?")) return;
    setDelId(id);
    try {
      await axios.delete(`/enquiry/${id}`, { headers: { Authorization:`Bearer ${TOKEN()}` } });
      setData(p => p.filter(e => e._id !== id));
      if (sel?._id === id) setSel(null);
    } catch { alert("Delete failed"); }
    finally { setDelId(null); }
  };

  /* ── Detail panel ── */
  if (sel) {
    const service = parseField(sel.message, "service");
    const budget  = parseField(sel.message, "budget");
    const area    = parseField(sel.message, "area");
    const email   = parseField(sel.message, "email");
    const msg     = cleanMessage(sel.message);

    return (
      <div style={{minHeight:"100vh",background:"#F5F2EC",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
        <Navbar title="Enquiry Detail"/>
        <div style={{maxWidth:680,margin:"0 auto",padding:"1.5rem"}}>
          <button onClick={()=>setSel(null)}
            style={{display:"inline-flex",alignItems:"center",gap:6,marginBottom:16,
              background:"#fff",border:"1px solid #E0D8CC",borderRadius:6,
              padding:"8px 16px",fontSize:13,cursor:"pointer",fontFamily:"inherit",color:"#6B5F45"}}>
            ← Back to All
          </button>
          <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.07)"}}>
            <div style={{background:"linear-gradient(135deg,#1A1208,#2A1E0C)",
              padding:"1.6rem 1.8rem",display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div>
                <div style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",color:"#E8C060",fontWeight:700}}>{sel.name}</div>
                <div style={{color:"#8A8070",fontSize:12,marginTop:4}}>{formatDT(sel.createdAt)}</div>
              </div>
              <div style={{color:"#C4982A",fontSize:12,background:"rgba(196,152,42,0.15)",
                border:"1px solid rgba(196,152,42,0.3)",borderRadius:12,padding:"4px 12px"}}>
                {timeAgo(sel.createdAt)}
              </div>
            </div>
            <div style={{padding:"1.6rem 1.8rem"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>
                <a href={`https://wa.me/${sel.phone.replace(/\D/g,"")}?text=Hi%20${sel.name}%2C%20regarding%20your%20enquiry...`}
                  target="_blank" rel="noopener noreferrer"
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                    background:"#25D366",color:"#fff",borderRadius:6,padding:"12px",
                    textDecoration:"none",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>
                  💬 WhatsApp
                </a>
                <a href={`tel:${sel.phone}`}
                  style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,
                    background:"#1565C0",color:"#fff",borderRadius:6,padding:"12px",
                    textDecoration:"none",fontWeight:700,fontSize:14,fontFamily:"inherit"}}>
                  📞 Call Now
                </a>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {[
                  {label:"Phone",   val:sel.phone,     icon:"📞"},
                  {label:"Service", val:service||"—",  icon:"🏛️"},
                  {label:"Budget",  val:budget||"—",   icon:"💰"},
                  {label:"Area",    val:area||"—",     icon:"📍"},
                  ...(email?[{label:"Email",val:email,icon:"📧"}]:[]),
                ].map((d,i)=>(
                  <div key={i} style={{background:"#FAFAF5",borderRadius:6,padding:"10px 14px",border:"1px solid #F0EAE0"}}>
                    <div style={{fontSize:10,color:"#8A7A60",letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{d.icon} {d.label}</div>
                    <div style={{fontSize:14,color:"#1A1510",fontWeight:600}}>{d.val}</div>
                  </div>
                ))}
              </div>
              {msg&&(
                <div style={{background:"#F5F0E6",borderRadius:6,padding:"14px 16px",
                  border:"1px solid rgba(196,152,42,0.2)",marginBottom:14}}>
                  <div style={{fontSize:10,color:"#8A7A60",letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>💬 Message</div>
                  <p style={{color:"#4A3A28",fontSize:14,lineHeight:1.7,margin:0,fontStyle:"italic"}}>"{msg}"</p>
                </div>
              )}
              <button onClick={()=>del(sel._id)} disabled={delId===sel._id}
                style={{width:"100%",background:"#FFEBEE",color:"#C62828",border:"1px solid #EF9A9A",
                  borderRadius:6,padding:"11px",fontSize:13,cursor:"pointer",fontFamily:"inherit",
                  fontWeight:600,opacity:delId===sel._id?0.6:1}}>
                🗑 Delete Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── List view ── */
  return (
    <div style={{minHeight:"100vh",background:"#F5F2EC",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <Navbar title="Enquiries"/>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:700,fontSize:18,color:"#1A1510"}}>
            Client Enquiries
            {!loading&&<span style={{color:"#8A7A60",fontSize:13,fontWeight:400,marginLeft:8}}>({data.length} total)</span>}
          </div>
          <button onClick={fetch}
            style={{background:"#fff",border:"1px solid #E0D8CC",borderRadius:6,
              padding:"8px 14px",fontSize:12,cursor:"pointer",fontFamily:"inherit",color:"#6B5F45"}}>
            ↻ Refresh
          </button>
        </div>

        {loading ? (
          <div style={{display:"flex",justifyContent:"center",padding:"4rem"}}>
            <div style={{width:40,height:40,border:"3px solid #F0EAE0",
              borderTopColor:"#C4982A",borderRadius:"50%",animation:"spin .7s linear infinite"}}/>
          </div>
        ) : data.length===0 ? (
          <div style={{background:"#fff",borderRadius:12,padding:"4rem",textAlign:"center",
            boxShadow:"0 2px 16px rgba(0,0,0,0.04)"}}>
            <div style={{fontSize:48,marginBottom:16}}>📭</div>
            <div style={{fontWeight:700,fontSize:16,color:"#1A1510",marginBottom:6}}>No enquiries yet</div>
            <div style={{color:"#8A7A60",fontSize:13}}>When customers submit the contact form, they appear here.</div>
          </div>
        ) : (
          <div style={{background:"#fff",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.06)"}}>
            {/* Header */}
            <div style={{display:"grid",gridTemplateColumns:"2fr 1.3fr 1.5fr 1.6fr 1fr",
              background:"#1A1208",padding:"12px 16px",gap:12}}>
              {["Customer","Phone","Service","Date & Time","Actions"].map(h=>(
                <div key={h} style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",
                  color:"#C4982A",fontWeight:700}}>{h}</div>
              ))}
            </div>
            {data.map((item,i)=>{
              const service = parseField(item.message,"service");
              const area    = parseField(item.message,"area");
              return (
                <div key={item._id||i} onClick={()=>setSel(item)}
                  style={{display:"grid",gridTemplateColumns:"2fr 1.3fr 1.5fr 1.6fr 1fr",
                    padding:"13px 16px",gap:12,alignItems:"center",
                    borderBottom:"1px solid #F5F0E8",
                    background:i%2===0?"#fff":"#FDFAF5",cursor:"pointer",transition:"background .12s"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#FDF6E8"}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#FDFAF5"}>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:"#1A1510"}}>{item.name}</div>
                    {area&&<div style={{fontSize:11,color:"#8A7A60",marginTop:2}}>📍 {area}</div>}
                  </div>
                  <div style={{fontSize:13,color:"#4A3A28"}}>{item.phone}</div>
                  <div>
                    {service
                      ? <span style={{background:"#FDF6E8",color:"#C4982A",border:"1px solid rgba(196,152,42,0.3)",
                          borderRadius:12,padding:"3px 10px",fontSize:11,fontWeight:600,display:"inline-block"}}>{service}</span>
                      : <span style={{color:"#C8C0B0",fontSize:12}}>—</span>}
                  </div>
                  <div>
                    <div style={{fontSize:12,color:"#4A3A28"}}>{formatDT(item.createdAt)}</div>
                    <div style={{fontSize:11,color:"#C4982A",marginTop:2}}>{timeAgo(item.createdAt)}</div>
                  </div>
                  <div style={{display:"flex",gap:6}} onClick={e=>e.stopPropagation()}>
                    <a href={`https://wa.me/${item.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                      style={{background:"#25D366",color:"#fff",borderRadius:5,padding:"7px 10px",
                        fontSize:11,fontWeight:700,textDecoration:"none"}}>WA</a>
                    <a href={`tel:${item.phone}`}
                      style={{background:"#1565C0",color:"#fff",borderRadius:5,padding:"7px 10px",
                        fontSize:11,fontWeight:700,textDecoration:"none"}}>📞</a>
                    <button onClick={()=>del(item._id)} disabled={delId===item._id}
                      style={{background:"#FFEBEE",color:"#C62828",border:"none",borderRadius:5,
                        padding:"7px 8px",fontSize:11,cursor:"pointer",fontFamily:"inherit",
                        opacity:delId===item._id?0.5:1}}>🗑</button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
    </div>
  );
}

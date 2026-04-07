import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";

const CATS = [
  { key:"marble",     label:"Marble Designs",     emoji:"🏛️", color:"#C4982A" },
  { key:"bathroom",   label:"Bathroom Designs",   emoji:"🚿", color:"#6AABCC" },
  { key:"flooring",   label:"Flooring Designs",   emoji:"🔲", color:"#E8A030" },
  { key:"commercial", label:"Commercial Designs",  emoji:"🏢", color:"#70CC88" },
  { key:"staircase",  label:"Staircase Designs",  emoji:"🪜", color:"#CC7070" },
  { key:"custom",     label:"Custom Designs",      emoji:"✨", color:"#AA80DD" },
];

const TOKEN = ()=>localStorage.getItem("token");

export default function Gallery() {
  const [activeCat, setActiveCat] = useState(CATS[0].key);
  const [items,     setItems]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title,     setTitle]     = useState("");
  const [file,      setFile]      = useState(null);
  const [preview,   setPreview]   = useState(null);
  const [msg,       setMsg]       = useState({ text:"", type:"" });
  const fileRef = useRef();
  const cat = CATS.find(c=>c.key===activeCat);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/gallery?category=${activeCat}`);
      setItems(res.data.data || []);
    } catch { setItems([]); }
    finally { setLoading(false); }
  };

  useEffect(()=>{ fetchItems(); setFile(null); setPreview(null); setTitle(""); setMsg({text:"",type:""}); }, [activeCat]);

  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) setPreview(URL.createObjectURL(f));
    else if (f.type.startsWith("video/")) setPreview("video");
    else setPreview(null);
  };

  const upload = async () => {
    if (!file || !title.trim()) { setMsg({text:"Please enter a title and select a file.",type:"err"}); return; }
    setUploading(true); setMsg({text:"Uploading…",type:"info"});
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title.trim());
    fd.append("category", activeCat);
    try {
      await axios.post("/gallery/upload", fd, { headers:{ Authorization:`Bearer ${TOKEN()}` } });
      setMsg({text:"✅ Uploaded! Public website updated.",type:"ok"});
      setFile(null); setPreview(null); setTitle(""); fileRef.current.value="";
      fetchItems();
    } catch (err) {
      setMsg({text:"Upload failed. Check file size and type.",type:"err"});
    } finally { setUploading(false); }
  };

  const del = async id => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await axios.delete(`/gallery/${id}`, { headers:{ Authorization:`Bearer ${TOKEN()}` } });
      setItems(p=>p.filter(i=>i._id!==id));
      setMsg({text:"✅ Deleted.",type:"ok"});
    } catch { setMsg({text:"Delete failed.",type:"err"}); }
  };

  const msgStyle = {
    ok:  { background:"#E8F5E9", color:"#1B5E20", border:"1px solid #A5D6A7" },
    err: { background:"#FFEBEE", color:"#B71C1C", border:"1px solid #EF9A9A" },
    info:{ background:"#E3F2FD", color:"#0D47A1", border:"1px solid #90CAF9" },
  }[msg.type] || {};

  return (
    <div style={{minHeight:"100vh",background:"#F5F2EC",fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <Navbar title="Gallery Manager"/>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"1.5rem"}}>

        {/* Category tabs */}
        <div style={{display:"flex",gap:0,background:"#fff",borderRadius:10,overflow:"hidden",
          boxShadow:"0 2px 16px rgba(0,0,0,0.06)",marginBottom:20,flexWrap:"wrap"}}>
          {CATS.map(c=>(
            <button key={c.key} onClick={()=>setActiveCat(c.key)} style={{
              flex:1,minWidth:100,padding:"14px 8px",border:"none",cursor:"pointer",
              fontFamily:"inherit",fontWeight:activeCat===c.key?700:500,fontSize:12,
              background: activeCat===c.key ? c.color : "transparent",
              color: activeCat===c.key ? "#fff" : "#6B5F45",
              borderBottom: activeCat===c.key ? "none" : "3px solid transparent",
              transition:"all 0.2s", display:"flex",flexDirection:"column",alignItems:"center",gap:4
            }}>
              <span style={{fontSize:22}}>{c.emoji}</span>
              <span>{c.label.replace(" Designs","")}</span>
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"360px 1fr",gap:18,alignItems:"start"}}>

          {/* ── Upload panel ── */}
          <div style={{background:"#fff",borderRadius:10,padding:"1.6rem",
            boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:`2px solid ${cat.color}22`,
            position:"sticky",top:90}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,
              paddingBottom:14,borderBottom:`2px solid ${cat.color}25`}}>
              <span style={{fontSize:28}}>{cat.emoji}</span>
              <div>
                <div style={{fontWeight:700,fontSize:15,color:"#1A1510"}}>{cat.label}</div>
                <div style={{fontSize:12,color:"#8A7A60",marginTop:2}}>Upload image or video</div>
              </div>
            </div>

            {/* File drop zone */}
            <div onClick={()=>fileRef.current.click()}
              style={{border:`2px dashed ${preview?"#C4982A":cat.color+"80"}`,borderRadius:8,
                padding:preview?"8px":"2rem",textAlign:"center",cursor:"pointer",marginBottom:14,
                background:preview?"#FAFAF5":"#FDFCFA",transition:"all 0.2s",
                minHeight:preview?0:120,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
              <input ref={fileRef} type="file" accept="image/*,video/*" style={{display:"none"}} onChange={handleFile}/>
              {preview==="video" ? (
                <div style={{padding:"1rem",color:cat.color}}>
                  <div style={{fontSize:40}}>🎬</div>
                  <div style={{fontSize:13,fontWeight:600,marginTop:8}}>{file?.name}</div>
                  <div style={{fontSize:11,color:"#8A7A60",marginTop:4}}>Click to change</div>
                </div>
              ) : preview ? (
                <div style={{position:"relative"}}>
                  <img src={preview} alt="preview"
                    style={{width:"100%",maxHeight:180,objectFit:"cover",borderRadius:6}}/>
                  <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",borderRadius:6,
                    display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:"opacity 0.2s"}}
                    onMouseEnter={e=>e.currentTarget.style.opacity=1}
                    onMouseLeave={e=>e.currentTarget.style.opacity=0}>
                    <span style={{color:"#fff",fontSize:13,fontWeight:700}}>Change file</span>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{fontSize:36,marginBottom:8,color:cat.color}}>📤</div>
                  <div style={{fontSize:13,fontWeight:600,color:"#1A1510"}}>Click to select file</div>
                  <div style={{fontSize:11,color:"#8A7A60",marginTop:4}}>JPG, PNG, MP4, WebM — max 50MB</div>
                </>
              )}
            </div>

            {/* Title */}
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:10,letterSpacing:2,textTransform:"uppercase",
                color:"#8A7A60",marginBottom:6,fontWeight:600}}>Project Title *</label>
              <input value={title} onChange={e=>setTitle(e.target.value)}
                placeholder={`e.g. ${cat.emoji} ${cat.label} — Client Project`}
                style={{width:"100%",background:"#FAFAF5",border:"1px solid #E8E0D0",borderRadius:6,
                  color:"#1A1510",padding:"11px 13px",fontSize:14,fontFamily:"inherit",
                  outline:"none",boxSizing:"border-box"}}/>
            </div>

            {/* Category reminder */}
            <div style={{fontSize:12,color:"#8A7A60",marginBottom:14,padding:"8px 12px",
              background:`${cat.color}12`,borderRadius:6,border:`1px solid ${cat.color}25`}}>
              📂 Will be saved under: <strong style={{color:cat.color}}>{cat.label}</strong>
            </div>

            {/* Upload btn */}
            <button onClick={upload} disabled={uploading||!file||!title.trim()}
              style={{width:"100%",background:uploading||!file||!title.trim()?"#ccc":cat.color,
                color:"#fff",border:"none",borderRadius:6,padding:"13px",fontSize:14,
                fontWeight:700,cursor:uploading||!file||!title.trim()?"not-allowed":"pointer",
                fontFamily:"inherit",transition:"background 0.2s",
                display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
              {uploading ? (
                <><span style={{display:"inline-block",width:16,height:16,border:"2px solid rgba(255,255,255,.4)",
                  borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>Uploading…</>
              ) : "Upload to Gallery"}
            </button>

            {msg.text&&(
              <div style={{marginTop:12,padding:"10px 13px",borderRadius:6,fontSize:13,...msgStyle}}>
                {msg.text}
              </div>
            )}

            <div style={{marginTop:14,padding:"10px 12px",background:"#F5F0E6",borderRadius:6,
              fontSize:12,color:"#6B5F45",lineHeight:1.6}}>
              ⚡ <strong>Instant sync:</strong> Uploaded photos appear on the public website immediately.
            </div>
          </div>

          {/* ── Items grid ── */}
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
              <div style={{fontWeight:700,fontSize:16,color:"#1A1510"}}>
                {cat.emoji} {cat.label} — {loading?"loading…":`${items.length} item${items.length!==1?"s":""}`}
              </div>
            </div>

            {loading ? (
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[1,2,3].map(i=><div key={i} style={{height:180,borderRadius:8,background:"#EEE8DC",
                  animation:"pulse 1.5s ease-in-out infinite alternate"}}/>)}
              </div>
            ) : items.length===0 ? (
              <div style={{background:"#fff",borderRadius:10,padding:"4rem",textAlign:"center",
                boxShadow:"0 2px 16px rgba(0,0,0,0.04)"}}>
                <div style={{fontSize:52,marginBottom:12}}>{cat.emoji}</div>
                <div style={{fontWeight:700,fontSize:16,color:"#1A1510",marginBottom:6}}>No {cat.label} yet</div>
                <div style={{fontSize:13,color:"#8A7A60"}}>Upload your first photo or video using the panel on the left.</div>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {items.map(item=>(
                  <div key={item._id} style={{background:"#fff",borderRadius:8,overflow:"hidden",
                    boxShadow:"0 2px 12px rgba(0,0,0,0.06)",border:"1px solid #F0EAE0"}}>
                    <div style={{position:"relative",height:160}}>
                      {item.type==="video" ? (
                        <video src={item.mediaUrl} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      ) : (
                        <img src={item.mediaUrl} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                      )}
                      {item.type==="video"&&(
                        <div style={{position:"absolute",top:8,right:8,background:"rgba(0,0,0,0.75)",
                          color:"#fff",padding:"2px 8px",borderRadius:3,fontSize:9,fontWeight:700}}>▶ VIDEO</div>
                      )}
                    </div>
                    <div style={{padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontSize:13,fontWeight:600,color:"#1A1510",
                          overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:140}}>{item.title}</div>
                        <div style={{fontSize:10,color:cat.color,letterSpacing:1,textTransform:"uppercase",marginTop:2}}>{item.category}</div>
                      </div>
                      <button onClick={()=>del(item._id)}
                        style={{background:"#FFEBEE",color:"#C62828",border:"none",borderRadius:6,
                          padding:"6px 10px",cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes pulse { from { opacity:.7; } to { opacity:.4; } }
      `}</style>
    </div>
  );
}

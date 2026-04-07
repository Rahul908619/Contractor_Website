import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";

const CATS = [
  { key:"marble",     label:"Marble Designs",     emoji:"🏛️", desc:"Italian, Makrana & exotic marble — walls, floors and custom surfaces",   grad:"linear-gradient(135deg,#8B7050 0%,#C4A870 50%,#6A5030 100%)", accent:"#E8C060" },
  { key:"bathroom",   label:"Bathroom Designs",   emoji:"🚿", desc:"Luxury bathrooms — custom vanities, showers, walls & marble flooring",   grad:"linear-gradient(135deg,#1A2A3A 0%,#253545 50%,#0E1A26 100%)", accent:"#7ABCCC" },
  { key:"flooring",   label:"Flooring Designs",   emoji:"🔲", desc:"Premium tile & marble flooring for living rooms, offices and kitchens", grad:"linear-gradient(135deg,#3A2A1A 0%,#5A4020 50%,#2A1A0A 100%)", accent:"#C4982A" },
  { key:"commercial", label:"Commercial Designs",  emoji:"🏢", desc:"Showrooms, hotels, offices — large-scale professional interiors",       grad:"linear-gradient(135deg,#1A2A1A 0%,#263826 50%,#0E1E0E 100%)", accent:"#70CC88" },
  { key:"staircase",  label:"Staircase Designs",  emoji:"🪜", desc:"Granite & marble staircases — open-riser, floating and classic styles",  grad:"linear-gradient(135deg,#2A1010 0%,#401818 50%,#1A0808 100%)", accent:"#CC7070" },
  { key:"custom",     label:"Custom Designs",      emoji:"✨", desc:"Bespoke mosaic, 3D tiles, inlay patterns and decorative stonework",      grad:"linear-gradient(135deg,#1E1030 0%,#2E1A48 50%,#120A20 100%)", accent:"#AA80DD" },
];

/* ── Marble SVG veins ─────────────────────────────────── */
function Veins({ id, col="#fff" }) {
  const s = id + 1;
  return (
    <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.18}} viewBox="0 0 400 280" preserveAspectRatio="none">
      <path d={`M${-20+s*25} 0 Q${80+s*18} ${80+s*12} ${200+s*8} 280`} stroke={col} strokeWidth="2" fill="none"/>
      <path d={`M0 ${50+s*18} Q${140+s*8} ${110+s*8} 400 ${90+s*12}`} stroke={col} strokeWidth="1.2" fill="none"/>
      <path d={`M${90+s*12} 0 Q${190+s*4} ${130+s*6} ${340-s*4} 280`} stroke={col} strokeWidth=".8" fill="none" opacity=".6"/>
    </svg>
  );
}

/* ── Lightbox ─────────────────────────────────────────── */
function Lightbox({ items, idx, close, prev, next }) {
  const item = items[idx];
  useEffect(()=>{
    const fn = e => { if(e.key==="Escape")close(); if(e.key==="ArrowLeft")prev(); if(e.key==="ArrowRight")next(); };
    window.addEventListener("keydown",fn); return ()=>window.removeEventListener("keydown",fn);
  },[]);
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      onClick={close}
      style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.95)",zIndex:500,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
      <button onClick={close} style={{position:"absolute",top:20,right:24,background:"none",
        border:"none",color:"#fff",fontSize:38,cursor:"pointer",lineHeight:1}}>×</button>
      <div style={{position:"absolute",top:26,left:"50%",transform:"translateX(-50%)",
        color:"#C4982A",fontSize:13,letterSpacing:2}}>{idx+1} / {items.length}</div>
      <button onClick={e=>{e.stopPropagation();prev();}} style={{position:"absolute",left:16,
        background:"rgba(196,152,42,0.18)",border:"1px solid rgba(196,152,42,0.4)",color:"#C4982A",
        fontSize:30,width:52,height:52,borderRadius:"50%",cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center"}}>‹</button>
      <motion.div key={idx} initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}}
        onClick={e=>e.stopPropagation()} style={{maxWidth:"80vw",maxHeight:"82vh",position:"relative"}}>
        {item?.type==="video"
          ? <video src={item.mediaUrl} controls autoPlay style={{maxWidth:"80vw",maxHeight:"82vh",borderRadius:8,outline:"2px solid rgba(196,152,42,.35)"}}/>
          : <img src={item?.mediaUrl} alt={item?.title} style={{maxWidth:"80vw",maxHeight:"82vh",objectFit:"contain",borderRadius:8,outline:"2px solid rgba(196,152,42,.35)"}}/>
        }
        {item?.title&&<div style={{position:"absolute",bottom:-34,left:0,right:0,textAlign:"center",color:"#C4B890",fontSize:14,fontFamily:"Georgia,serif"}}>{item.title}</div>}
      </motion.div>
      <button onClick={e=>{e.stopPropagation();next();}} style={{position:"absolute",right:16,
        background:"rgba(196,152,42,0.18)",border:"1px solid rgba(196,152,42,0.4)",color:"#C4982A",
        fontSize:30,width:52,height:52,borderRadius:"50%",cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center"}}>›</button>
    </motion.div>
  );
}

/* ── Individual tile in grid ─────────────────────────── */
function Tile({ item, onClick, tall }) {
  const [hov,setHov]=useState(false);
  return (
    <div onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{position:"relative",borderRadius:6,overflow:"hidden",height:tall?500:240,cursor:"pointer",
        border:`1.5px solid ${hov?"rgba(196,152,42,0.55)":"transparent"}`,transition:"border-color 0.25s"}}>
      {item.type==="video"
        ? <video src={item.mediaUrl} style={{width:"100%",height:"100%",objectFit:"cover",transform:hov?"scale(1.05)":"scale(1)",transition:"transform 0.5s"}}/>
        : <img src={item.mediaUrl} alt={item.title} style={{width:"100%",height:"100%",objectFit:"cover",transform:hov?"scale(1.05)":"scale(1)",transition:"transform 0.5s"}}/>
      }
      {item.type==="video"&&<div style={{position:"absolute",top:10,right:10,background:"rgba(0,0,0,0.75)",color:"#fff",padding:"3px 9px",borderRadius:3,fontSize:10,fontWeight:700}}>▶ VIDEO</div>}
      <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,.88) 0%,rgba(0,0,0,.15) 55%,transparent 100%)",opacity:hov?1:.5,transition:"opacity 0.3s",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"1.2rem 1rem"}}>
        <div style={{color:"#F5F0E6",fontSize:14,fontFamily:"Georgia,serif",transform:hov?"translateY(0)":"translateY(6px)",transition:"transform 0.3s"}}>{item.title}</div>
        {hov&&<div style={{color:"#C4982A",fontSize:10,letterSpacing:2,textTransform:"uppercase",marginTop:4}}>Click to view full size →</div>}
      </div>
    </div>
  );
}

/* ── Category detail page ─────────────────────────────── */
function CatView({ cat, onBack }) {
  const [items,setItems]=useState([]);
  const [loading,setLoading]=useState(true);
  const [lbIdx,setLbIdx]=useState(null);
  const ci = CATS.findIndex(c=>c.key===cat.key);

  useEffect(()=>{
    axios.get(`/gallery?category=${cat.key}`)
      .then(r=>setItems(r.data.data||[]))
      .catch(console.error)
      .finally(()=>setLoading(false));
  },[cat.key]);

  return (
    <div style={{paddingTop:"5rem",minHeight:"100vh",background:"#0E0C08"}}>
      <AnimatePresence>{lbIdx!==null&&<Lightbox items={items} idx={lbIdx} close={()=>setLbIdx(null)} prev={()=>setLbIdx(i=>(i-1+items.length)%items.length)} next={()=>setLbIdx(i=>(i+1)%items.length)}/>}</AnimatePresence>

      {/* Hero banner */}
      <div style={{position:"relative",overflow:"hidden",padding:"4.5rem 2rem 3rem",borderBottom:"1px solid rgba(196,152,42,0.12)"}}>
        <div style={{position:"absolute",inset:0,background:cat.grad,opacity:.55}}/>
        <Veins id={ci} col={cat.accent}/>
        <div style={{maxWidth:1280,margin:"0 auto",position:"relative",zIndex:1}}>
          <button onClick={onBack} style={{background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",
            color:"#fff",borderRadius:3,padding:"7px 18px",fontSize:11,letterSpacing:2,textTransform:"uppercase",
            cursor:"pointer",fontFamily:"inherit",marginBottom:22,display:"inline-flex",alignItems:"center",gap:8}}>
            ← All Categories
          </button>
          <div style={{fontSize:52,marginBottom:12}}>{cat.emoji}</div>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(1.8rem,4vw,3rem)",color:"#fff",fontWeight:700,margin:"0 0 10px"}}>{cat.label}</h1>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:15,margin:0}}>{cat.desc}</p>
          <div style={{marginTop:12,color:"rgba(255,255,255,0.35)",fontSize:12,letterSpacing:2}}>
            {loading?"Loading…":`${items.length} project${items.length!==1?"s":""}`}
          </div>
        </div>
      </div>

      <div style={{maxWidth:1280,margin:"0 auto",padding:"2.5rem 2rem 5rem"}}>
        {loading ? (
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
            {[1,2,3,4,5,6].map(i=><div key={i} style={{height:260,borderRadius:6,background:"#1A1510",animation:"pulse 1.5s ease-in-out infinite alternate"}}/>)}
          </div>
        ) : items.length===0 ? (
          <div style={{textAlign:"center",padding:"5rem",color:"#6B5F45"}}>
            <div style={{fontSize:60,marginBottom:16}}>{cat.emoji}</div>
            <h3 style={{fontFamily:"Georgia,serif",color:"#C4982A",fontSize:"1.4rem",marginBottom:10}}>Coming Soon</h3>
            <p style={{fontSize:14,lineHeight:1.8,maxWidth:380,margin:"0 auto 20px"}}>
              We're uploading {cat.label.toLowerCase()} projects. Contact us to see our portfolio!
            </p>
            <a href="/contact" style={{display:"inline-block",background:"#C4982A",color:"#fff",borderRadius:3,
              padding:"11px 26px",fontSize:12,letterSpacing:2,textTransform:"uppercase",fontWeight:700,textDecoration:"none"}}>
              Contact Us →
            </a>
          </div>
        ) : (
          <>
            {/* Masonry first row */}
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14,marginBottom:14}}>
              <Tile item={items[0]} tall onClick={()=>setLbIdx(0)}/>
              <div style={{display:"grid",gridTemplateRows:"1fr 1fr",gap:14}}>
                {items[1]&&<Tile item={items[1]} onClick={()=>setLbIdx(1)}/>}
                {items[2]&&<Tile item={items[2]} onClick={()=>setLbIdx(2)}/>}
              </div>
            </div>
            {/* Rest */}
            {items.length>3&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
                {items.slice(3).map((item,i)=>(
                  <motion.div key={item._id||i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}>
                    <Tile item={item} onClick={()=>setLbIdx(i+3)}/>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ── 3D Category card ─────────────────────────────────── */
function CatCard({ cat, i, count, onClick }) {
  const [hov,setHov]=useState(false);
  const [rot,setRot]=useState({x:0,y:0});
  const mm = useCallback(e=>{
    const r=e.currentTarget.getBoundingClientRect();
    setRot({ x:((e.clientY-r.top)/r.height-.5)*-13, y:((e.clientX-r.left)/r.width-.5)*13 });
  },[]);

  return (
    <motion.div
      initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setRot({x:0,y:0});}}
      onMouseMove={mm} onClick={onClick}
      style={{ position:"relative",borderRadius:10,overflow:"hidden",height:290,cursor:"pointer",
        background:cat.grad,
        transform: hov
          ? `perspective(800px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(14px) scale(1.025)`
          : "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)",
        transition: hov?"transform 0.08s ease-out":"transform 0.42s ease",
        boxShadow: hov ? `0 28px 60px rgba(0,0,0,0.55), 0 0 0 1.5px ${cat.accent}55` : "0 8px 30px rgba(0,0,0,0.4)",
      }}>
      <Veins id={i} col={cat.accent}/>
      {/* tile grid */}
      <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:.05}} viewBox="0 0 400 290">
        {[0,1,2,3].map(r=>[0,1,2,3,4].map(c=>(
          <rect key={`${r}-${c}`} x={c*80+1} y={r*73+1} width={78} height={71} fill="none" stroke="#fff" strokeWidth=".8"/>
        )))}
      </svg>
      {hov&&<div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(255,255,255,0.07) 0%,transparent 50%,rgba(255,255,255,0.03) 100%)"}}/>}

      <div style={{position:"absolute",inset:0,padding:"1.8rem",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        {/* top */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div style={{fontSize:46}}>{cat.emoji}</div>
          <div style={{background:"rgba(0,0,0,0.42)",border:`1px solid ${cat.accent}50`,
            color:cat.accent,fontSize:11,letterSpacing:1.5,padding:"4px 12px",borderRadius:12,fontWeight:700}}>
            {count>0?`${count} photos`:"View all"}
          </div>
        </div>
        {/* bottom */}
        <div>
          <h3 style={{fontFamily:"Georgia,serif",fontSize:"1.35rem",color:"#fff",fontWeight:700,margin:"0 0 8px",textShadow:"0 2px 8px rgba(0,0,0,0.5)"}}>
            {cat.label}
          </h3>
          <p style={{color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.6,margin:"0 0 16px",
            opacity:hov?1:.75,transition:"opacity 0.3s"}}>
            {cat.desc}
          </p>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,
            background:hov?cat.accent:"rgba(255,255,255,0.1)",
            color:hov?"#fff":"rgba(255,255,255,0.75)",borderRadius:3,padding:"8px 18px",
            fontSize:11,letterSpacing:2,textTransform:"uppercase",fontWeight:700,
            border:`1px solid ${hov?cat.accent:"rgba(255,255,255,0.18)"}`,transition:"all 0.25s"}}>
            View Projects →
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ─────────────────────────────────────── */
export default function Gallery() {
  const [activeCat,setActiveCat]=useState(null);
  const [counts,setCounts]=useState({});

  useEffect(()=>{
    axios.get("/gallery")
      .then(r=>{
        const c={};
        (r.data.data||[]).forEach(item=>{ c[item.category]=(c[item.category]||0)+1; });
        setCounts(c);
      }).catch(console.error);
  },[]);

  if (activeCat) return <CatView cat={activeCat} onBack={()=>setActiveCat(null)}/>;

  return (
    <div style={{paddingTop:"5rem",minHeight:"100vh",background:"#0E0C08"}}>
      {/* Header */}
      <div style={{padding:"4rem 2rem 3rem",textAlign:"center",borderBottom:"1px solid rgba(196,152,42,0.12)"}}>
        <motion.div initial={{opacity:0,y:-16}} animate={{opacity:1,y:0}}>
          <p style={{color:"#C4982A",fontSize:10,letterSpacing:5,textTransform:"uppercase",marginBottom:14}}>Our Portfolio</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(2.2rem,4vw,3.4rem)",fontWeight:700,color:"#F5F0E6",margin:"0 0 14px"}}>
            Project <span style={{color:"#C4982A"}}>Gallery</span>
          </h1>
          <p style={{color:"#6B5F45",fontSize:15,maxWidth:480,margin:"0 auto"}}>
            Browse by category — click any card to explore photos and videos from our real projects.
          </p>
        </motion.div>
      </div>

      {/* 3D Category grid */}
      <div style={{maxWidth:1280,margin:"0 auto",padding:"3rem 2rem 5rem"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
          {CATS.map((cat,i)=>(
            <CatCard key={cat.key} cat={cat} i={i} count={counts[cat.key]||0} onClick={()=>setActiveCat(cat)}/>
          ))}
        </div>
      </div>
    </div>
  );
}

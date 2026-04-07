import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../api/axios";

// FIX: No API key in frontend. Requests go to backend /api/chat
// Backend (chat.controller.js) holds Groq/OpenAI key in .env

export default function Chatbot() {
  const [open,    setOpen]    = useState(false);
  const [msgs,    setMsgs]    = useState([
    { text:"Hi! I'm the SK Tiles & Marbles assistant. How can I help? 🏛️", bot:true }
  ]);
  const [input,   setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs,open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMsgs(p=>[...p,{text,bot:false}]);
    setLoading(true);
    try {
      const res = await axios.post("/chat", { message: text });
      setMsgs(p=>[...p,{text: res.data?.reply || "Please call 8619181791 for help!",bot:true}]);
    } catch {
      setMsgs(p=>[...p,{text:"Sorry, I'm having trouble. Call 8619181791 or WhatsApp us!",bot:true}]);
    } finally { setLoading(false); }
  };

  const SUGG = ["What services?","Marble price?","Contact details","Free site visit?"];

  return (
    <div style={{position:"fixed",bottom:88,right:20,zIndex:60}}>
      <button onClick={()=>setOpen(o=>!o)} style={{width:52,height:52,background:"#1A1510",
        color:"#fff",borderRadius:"50%",border:"none",cursor:"pointer",fontSize:24,
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 4px 20px rgba(0,0,0,0.35)",marginLeft:"auto",
        outline:"3px solid rgba(196,152,42,0.35)"}}>🤖</button>
      <AnimatePresence>
        {open&&(
          <motion.div initial={{opacity:0,y:16,scale:0.92}} animate={{opacity:1,y:0,scale:1}}
            exit={{opacity:0,y:16,scale:0.92}}
            style={{position:"absolute",bottom:64,right:0,width:320,background:"#fff",
              borderRadius:12,overflow:"hidden",border:"1px solid rgba(196,152,42,0.28)",
              boxShadow:"0 24px 60px rgba(0,0,0,0.18)"}}>
            <div style={{background:"#1A1510",padding:"12px 16px",display:"flex",
              alignItems:"center",justifyContent:"space-between"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:32,height:32,background:"#C4982A",borderRadius:"50%",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:14,fontWeight:700,color:"#fff",fontFamily:"Georgia,serif"}}>SK</div>
                <div>
                  <div style={{color:"#F5F0E6",fontSize:13,fontWeight:700}}>SK Assistant</div>
                  <div style={{color:"#4CAF50",fontSize:10}}>● Online</div>
                </div>
              </div>
              <button onClick={()=>setOpen(false)} style={{background:"none",border:"none",
                color:"#8A8070",cursor:"pointer",fontSize:22,lineHeight:1}}>×</button>
            </div>
            <div style={{height:240,overflowY:"auto",padding:12,display:"flex",flexDirection:"column",gap:8}}>
              {msgs.map((m,i)=>(
                <div key={i} style={{display:"flex",justifyContent:m.bot?"flex-start":"flex-end"}}>
                  <div style={{maxWidth:"84%",padding:"9px 13px",fontSize:13,lineHeight:1.6,
                    borderRadius:10,background:m.bot?"#F5F0E6":"#C4982A",color:m.bot?"#1A1510":"#fff",
                    borderBottomLeftRadius:m.bot?2:10,borderBottomRightRadius:m.bot?10:2}}>{m.text}</div>
                </div>
              ))}
              {loading&&<div style={{display:"flex"}}><div style={{padding:"9px 13px",
                background:"#F5F0E6",borderRadius:10,borderBottomLeftRadius:2,
                fontSize:13,color:"#8A7A60",fontStyle:"italic"}}>Typing…</div></div>}
              <div ref={bottomRef}/>
            </div>
            <div style={{padding:"6px 10px",borderTop:"1px solid #EEE8DC",display:"flex",gap:5,flexWrap:"wrap"}}>
              {SUGG.map(s=>(
                <button key={s} onClick={()=>{setInput(s);setTimeout(send,50);}}
                  style={{background:"#F5F0E6",color:"#6B5F45",border:"1px solid #E8E0D0",
                    borderRadius:12,padding:"3px 9px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                  {s}</button>
              ))}
            </div>
            <div style={{padding:"8px 10px",borderTop:"1px solid #EEE8DC",display:"flex",gap:8}}>
              <input value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&send()} disabled={loading}
                placeholder="Type a message…"
                style={{flex:1,background:"#F5F0E6",border:"1px solid #E8E0D0",
                  borderRadius:20,color:"#1A1510",padding:"8px 14px",fontSize:13,
                  fontFamily:"inherit",outline:"none"}}/>
              <button onClick={send} disabled={loading}
                style={{background:"#C4982A",color:"#fff",border:"none",borderRadius:"50%",
                  width:36,height:36,cursor:loading?"not-allowed":"pointer",
                  fontSize:16,flexShrink:0,opacity:loading?0.6:1}}>→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

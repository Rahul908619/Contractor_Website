import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const FOUNDER_IMG = "/founder.jpg";

const STATS=[{n:"2019",l:"Year Founded"},{n:"500+",l:"Projects Done"},{n:"20+",l:"Years Experience"},{n:"100%",l:"Client Satisfaction"}];
const WHY=[
  {icon:"✦",title:"Skilled Craftsmen",desc:"Every worker is trained and experienced. No compromise on quality."},
  {icon:"✦",title:"Transparent Pricing",desc:"No hidden charges. The estimate we give is the final price."},
  {icon:"✦",title:"On-Time Delivery",desc:"We respect your schedule. Every project finishes within agreed timeline."},
  {icon:"✦",title:"Complete Contract Work",desc:"We manage everything — design, procurement, installation, cleanup."},
  {icon:"✦",title:"Free Site Visit",desc:"We visit your location, assess the space, and estimate at no cost."},
  {icon:"✦",title:"After-Work Support",desc:"We stand behind every job. Any issue post-handover — we fix it."},
];

export default function About() {
  return (
    <div style={{paddingTop:"5rem",minHeight:"100vh",background:"#FAFAF5",fontFamily:"'Segoe UI',system-ui,sans-serif",color:"#1A1510"}}>
      {/* Header */}
      <div style={{background:"#F2EDE0",borderBottom:"1px solid rgba(196,152,42,0.2)",padding:"3.5rem 2rem"}}>
        <div style={{maxWidth:1200,margin:"0 auto"}}>
          <p style={{color:"#C4982A",fontSize:10,letterSpacing:5,textTransform:"uppercase",marginBottom:12}}>Our Story</p>
          <h1 style={{fontFamily:"Georgia,serif",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:700,color:"#1A1510",margin:"0 0 10px"}}>About SK Contractor</h1>
          <p style={{color:"#6B5F45",fontSize:15,maxWidth:620,lineHeight:1.7,margin:0}}>
            Delivering high-quality tile, marble, and granite fitting across Maharashtra and Rajasthan — backed by years of experience, skilled craftsmanship, and honest service.
          </p>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"4rem 2rem"}}>
        {/* Who We Are + Founder */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:56,alignItems:"start",marginBottom:"5rem"}}>
          <motion.div initial={{opacity:0,x:-24}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <p style={{color:"#C4982A",fontSize:10,letterSpacing:4,textTransform:"uppercase",marginBottom:14}}>Who We Are</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"2rem",fontWeight:700,color:"#1A1510",marginBottom:"1.2rem",lineHeight:1.25}}>
              Trusted Name in Tile, Marble & Granite Fitting
            </h2>
            <p style={{color:"#4A3A28",fontSize:15,lineHeight:1.9,marginBottom:14}}>
              <strong style={{color:"#1A1510"}}>SK Contractor</strong> is a trusted name in tile, granite, and marble installation, known for delivering high-quality craftsmanship and long-lasting flooring solutions. With over <strong style={{color:"#C4982A"}}>20+ years of experience</strong>, we bring expertise, precision, and dedication to every project.
            </p>
            <p style={{color:"#4A3A28",fontSize:15,lineHeight:1.9,marginBottom:14}}>
              Our journey began in <strong style={{color:"#1A1510"}}>2019</strong>, with a small but passionate team of skilled workers. From those humble beginnings, we have grown into a reliable and preferred contractor for both residential and commercial projects across Maharashtra and Rajasthan.
            </p>
            <p style={{color:"#4A3A28",fontSize:15,lineHeight:1.9,marginBottom:24}}>
              Through honesty, consistent quality work, and strong customer relationships, we have built a reputation that clients trust and recommend. <em style={{color:"#C4982A"}}>Your trust is our biggest strength.</em>
            </p>
            <div style={{background:"#F5F0E6",borderRadius:8,padding:"1.4rem 1.6rem",border:"1px solid rgba(196,152,42,0.2)"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"1rem",color:"#C4982A",marginBottom:12,fontWeight:700}}>Our Mission</div>
              {["Deliver top-quality flooring services","Maintain affordable & transparent pricing","Ensure timely project completion","Achieve 100% customer satisfaction"].map((m,i)=>(
                <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                  <span style={{color:"#C4982A",flexShrink:0,marginTop:2}}>✔</span>
                  <span style={{color:"#4A3A28",fontSize:14,lineHeight:1.6}}>{m}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 3D Founder Frame */}
          <motion.div initial={{opacity:0,x:24}} whileInView={{opacity:1,x:0}} viewport={{once:true}}
            style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{position:"relative",width:300,filter:"drop-shadow(0 24px 48px rgba(0,0,0,0.25))"}}>
              {/* Animated gold border */}
              <div style={{position:"absolute",inset:-4,borderRadius:22,
                background:"linear-gradient(135deg,#E8C060,#C4982A,#8A6010,#C4982A,#E8C060)",
                animation:"goldSpin 4s linear infinite",zIndex:0}}/>
              {/* White gap */}
              <div style={{position:"absolute",inset:4,borderRadius:18,background:"#FAF7F0",zIndex:1}}/>
              {/* Photo */}
              <div style={{position:"relative",zIndex:2,margin:8,borderRadius:14,overflow:"hidden"}}>
                <img src={FOUNDER_IMG} alt="Shimbhu Dayal Kumawat"
                  style={{width:"100%",display:"block",borderRadius:14}}/>
                <div style={{position:"absolute",inset:0,borderRadius:14,
                  background:"linear-gradient(135deg,rgba(232,192,96,0.1) 0%,transparent 50%,rgba(196,152,42,0.06) 100%)",
                  pointerEvents:"none"}}/>
              </div>
              {/* Corner gold dots */}
              {[{t:-4,l:-4},{t:-4,r:-4},{b:-4,l:-4},{b:-4,r:-4}].map((pos,i)=>(
                <div key={i} style={{position:"absolute",width:10,height:10,borderRadius:"50%",
                  background:"#E8C060",zIndex:5,...{top:pos.t,left:pos.l,right:pos.r,bottom:pos.b}}}/>
              ))}
            </div>

            {/* Name plate */}
            <div style={{marginTop:24,textAlign:"center",
              background:"linear-gradient(135deg,#1A1208,#2A1E0C)",
              borderRadius:10,padding:"1.2rem 2rem",
              border:"1px solid rgba(196,152,42,0.4)",
              boxShadow:"0 8px 32px rgba(0,0,0,0.2)",width:"100%",maxWidth:300}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",fontWeight:700,color:"#E8C060",marginBottom:4}}>
                Shimbhu Dayal Kumawat
              </div>
              <div style={{color:"#C4982A",fontSize:11,letterSpacing:2.5,textTransform:"uppercase"}}>
                Founder & Master Contractor
              </div>
              <div style={{height:1,background:"linear-gradient(90deg,transparent,rgba(196,152,42,0.5),transparent)",margin:"10px 0"}}/>
              <div style={{color:"#8A8070",fontSize:12,lineHeight:1.6}}>
                20+ Years of Hands-On Experience<br/>Maharashtra & Rajasthan
              </div>
            </div>

            {/* Quote */}
            <div style={{marginTop:18,maxWidth:300,fontSize:13,fontStyle:"italic",color:"#6B5F45",
              lineHeight:1.8,borderLeft:"3px solid #C4982A",paddingLeft:14}}>
              "At SK Contractor, we don't just complete projects — we build relationships that last for years."
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",marginBottom:"5rem",
          background:"#C4982A",borderRadius:10,overflow:"hidden"}}>
          {STATS.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}}
              viewport={{once:true}} transition={{delay:i*.08}}
              style={{textAlign:"center",padding:"2rem 1rem",
                borderRight:i<3?"1px solid rgba(255,255,255,0.22)":"none"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"2.2rem",fontWeight:700,color:"#fff"}}>{s.n}</div>
              <div style={{color:"rgba(255,255,255,.82)",fontSize:11,letterSpacing:2.5,textTransform:"uppercase",marginTop:6}}>{s.l}</div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div style={{marginBottom:"5rem"}}>
          <div style={{textAlign:"center",marginBottom:"3rem"}}>
            <p style={{color:"#C4982A",fontSize:10,letterSpacing:4,textTransform:"uppercase",marginBottom:12}}>Why Work With Us</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"2.2rem",fontWeight:700,color:"#1A1510",margin:0}}>Our Strengths</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
            {WHY.map((w,i)=>(
              <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
                viewport={{once:true}} transition={{delay:i*.07}}
                style={{background:"#fff",border:"1px solid rgba(196,152,42,0.2)",
                  borderTop:"3px solid #C4982A",borderRadius:6,padding:"1.6rem"}}>
                <div style={{color:"#C4982A",fontSize:20,marginBottom:10}}>{w.icon}</div>
                <h3 style={{fontFamily:"Georgia,serif",fontSize:"1.05rem",color:"#1A1510",marginBottom:8}}>{w.title}</h3>
                <p style={{color:"#6B5F45",fontSize:13,lineHeight:1.75,margin:0}}>{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Presence */}
        <div style={{background:"linear-gradient(135deg,#1A1208,#2A1E0C)",borderRadius:10,
          padding:"3rem",border:"1px solid rgba(196,152,42,0.25)",marginBottom:"3rem"}}>
          <div style={{textAlign:"center",marginBottom:"2.5rem"}}>
            <p style={{color:"#C4982A",fontSize:10,letterSpacing:4,textTransform:"uppercase",marginBottom:10}}>Our Presence</p>
            <h2 style={{fontFamily:"Georgia,serif",fontSize:"2rem",fontWeight:700,color:"#F5F0E6",margin:0}}>Where We Work</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
            {[
              {city:"Nashik, Maharashtra",addr:"Takli Road, Taphovan, Nashik, MH",phone:"8619181791",icon:"🏙️",
                areas:"Nashik, Pune, Mumbai, Thane, Aurangabad and surrounding areas"},
              {city:"Jaipur, Rajasthan",addr:"Rajasthan Operations",phone:"9028933305",icon:"🏯",
                areas:"Jaipur, Jodhpur, Udaipur, Kota, Ajmer, Bikaner and surrounding areas"},
            ].map((loc,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.04)",borderRadius:8,
                padding:"1.5rem",border:"1px solid rgba(196,152,42,0.2)"}}>
                <div style={{fontSize:28,marginBottom:10}}>{loc.icon}</div>
                <div style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",color:"#E8C060",marginBottom:8}}>{loc.city}</div>
                <div style={{color:"#8A8070",fontSize:13,marginBottom:6}}>📍 {loc.addr}</div>
                <div style={{color:"#C4982A",fontSize:13,marginBottom:10}}>📞 {loc.phone}</div>
                <div style={{color:"#6B5F45",fontSize:12,lineHeight:1.7}}><strong style={{color:"#8A8070"}}>Areas served:</strong> {loc.areas}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{textAlign:"center"}}>
          <p style={{color:"#6B5F45",fontSize:15,marginBottom:20}}>Ready to start your project? Book a free site visit today.</p>
          <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
            <Link to="/contact" style={{background:"#C4982A",color:"#fff",borderRadius:3,
              padding:"13px 32px",fontSize:12,letterSpacing:2,textTransform:"uppercase",fontWeight:700,textDecoration:"none"}}>
              Get Free Site Visit →
            </Link>
            <a href="https://wa.me/918619181791" target="_blank" rel="noopener noreferrer"
              style={{display:"inline-flex",alignItems:"center",gap:8,background:"#25D366",color:"#fff",
                borderRadius:3,padding:"13px 28px",fontSize:12,letterSpacing:1.5,textTransform:"uppercase",
                fontWeight:700,textDecoration:"none"}}>
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes goldSpin {
          0%   { filter: hue-rotate(0deg) brightness(1); }
          50%  { filter: hue-rotate(30deg) brightness(1.18); }
          100% { filter: hue-rotate(0deg) brightness(1); }
        }
      `}</style>
    </div>
  );
}

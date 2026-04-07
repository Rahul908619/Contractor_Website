import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Pricing() {
  const grouped = {
    "Flooring Work": [
      { _id: 'fw1', name: "Italian Granite Flooring", price: 88, unit: "sqft" },
      { _id: 'fw2', name: "Wooden Flooring", price: 30, unit: "sqft" },
      { _id: 'fw3', name: "Granite Flooring", price: 73, unit: "sqft" },
      { _id: 'fw4', name: "800x1600 Tile Flooring", price: 30, unit: "sqft" }
    ],
    "Wall & Cladding": [
      { _id: 'wc1', name: "Italian Wall Cladding", price: 128, unit: "sqft" },
      { _id: 'wc2', name: "Granite Wall Cladding", price: 108, unit: "sqft" },
      { _id: 'wc3', name: "1200x1800 Wall Cladding", price: 45, unit: "sqft" },
      { _id: 'wc4', name: "800x1600 Wall Tile", price: 35, unit: "sqft" }
    ],
    "Frame & Fitting": [
      { _id: 'ff1', name: "Door/Window Frame Cutting & Fitting", price: 78, unit: "rft" },
      { _id: 'ff2', name: "Italian Door Frame Work", price: 88, unit: "rft" },
      { _id: 'ff3', name: "Photo Frame Work", price: 83, unit: "rft" }
    ],
    "Finishing Work": [
      { _id: 'fi1', name: "Champer Work", price: 30, unit: "rft" },
      { _id: 'fi2', name: "Moulding", price: 60, unit: "rft" },
      { _id: 'fi3', name: "45° Katra Cutting", price: 60, unit: "rft" },
      { _id: 'fi4', name: "Border Patti", price: 68, unit: "rft" }
    ],
    "Staircase & Special Work": [
      { _id: 'ss1', name: "Riser Cutting", price: 78, unit: "rft" },
      { _id: 'ss2', name: "Tappa Work", price: 88, unit: "sqft" },
      { _id: 'ss3', name: "Hard Machan (Base Work)", price: 15, unit: "sqft" }
    ],
    "Extra Work": [
      { _id: 'ew1', name: "Old Flooring Removing", price: 12, unit: "sqft" },
      { _id: 'ew2', name: "Skirting Remove", price: 8, unit: "rft" },
      { _id: 'ew3', name: "Basin Counter", price: 5000, unit: "piece" },
      { _id: 'ew4', name: "Nani Trap", price: 200, unit: "piece" },
      { _id: 'ew5', name: "Light Core Cutting", price: 100, unit: "piece" }
    ]
  };

  const loading = false;
  const lastSync = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'long', year: 'numeric' });
  const categories = Object.keys(grouped);

  return (
    <div style={{ paddingTop: '5rem', minHeight: '100vh', background: '#FAF7F0' }}>
      {/* Header */}
      <div style={{ background: '#F2EDE0', borderBottom: '1px solid rgba(196,152,42,0.2)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: 4, textTransform: 'uppercase', color: '#C4982A', marginBottom: 12 }}>
              Transparent Pricing
            </div>
            <h1 style={{ fontFamily: 'Georgia,serif', fontSize: '2.8rem', fontWeight: 700, color: '#1A1510', margin: '0 0 8px' }}>
              Price List
            </h1>
            {lastSync && (
              <div style={{ color: '#8A7A60', fontSize: 13 }}>
                Last updated: <span style={{ color: '#C4982A' }}>{lastSync}</span>
                &nbsp;·&nbsp;All prices per sq ft (₹) · GST extra
              </div>
            )}
          </div>
          <Link to="/contact" style={{
            background: '#C4982A', color: '#fff', borderRadius: 3,
            padding: '12px 24px', fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
            Request Callback
          </Link>
        </div>
      </div>

      {/* Price Tables */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '3rem 2rem' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
            {[1,2,3,4].map(i => (
              <div key={i} style={{ height: 200, background: '#EEE8DC', borderRadius: 6,
                animation: 'pulse 1.5s ease-in-out infinite alternate' }}/>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#8A7A60' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🏗</div>
            <h3 style={{ fontFamily: 'Georgia,serif', fontSize: '1.4rem', color: '#1A1510', marginBottom: 10 }}>
              Price List Coming Soon
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              Please contact us directly for pricing — we'll send you a custom estimate tailored to your project.
            </p>
            <Link to="/contact" style={{
              display: 'inline-block', marginTop: 20, background: '#C4982A',
              color: '#fff', borderRadius: 3, padding: '12px 28px',
              fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600, textDecoration: 'none' }}>
              Contact Us
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(380px,1fr))', gap: 24 }}>
            {categories.map((cat, ci) => (
              <motion.div key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: "0px 15px 30px rgba(196,152,42,0.15)", borderColor: "rgba(196,152,42,0.5)" }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.08, type: 'spring', stiffness: 300 }}
                style={{ 
                  background: '#fff', 
                  border: '1px solid rgba(196,152,42,0.2)', 
                  borderRadius: 12, 
                  overflow: 'hidden',
                  transition: 'border-color 0.3s ease'
                }}>
                {/* Category header */}
                <div style={{ 
                  background: 'linear-gradient(135deg, #1A1510 0%, #2A241C 100%)', 
                  padding: '1.2rem 1.6rem', 
                  borderBottom: '3px solid #C4982A' 
                }}>
                  <h3 style={{ fontFamily: 'Georgia,serif', color: '#F2EDE0', margin: 0, fontSize: '1.15rem', letterSpacing: '0.5px' }}>{cat}</h3>
                </div>
                {/* Items */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {grouped[cat].map((item, ii) => (
                      <motion.tr 
                        key={item._id} 
                        initial={{ backgroundColor: ii % 2 === 0 ? 'transparent' : '#FDFAF5' }}
                        whileHover={{ backgroundColor: '#FDF7EB', cursor: 'pointer' }}
                        style={{ borderBottom: '1px solid #F5F0E8', transition: 'background-color 0.2s ease' }}>
                        <td style={{ padding: '14px 16px', color: '#332C24', fontSize: 14, fontWeight: 500 }}>
                          <motion.div 
                             whileHover={{ color: '#D4AF37', x: 5 }}
                             transition={{ type: 'spring', stiffness: 300 }}
                             style={{ display: 'inline-block' }}>
                            {item.name}
                          </motion.div>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          {item.price !== null ? (
                            <motion.span 
                              whileHover={{ scale: 1.08, color: '#D4AF37' }}
                              style={{ display: 'inline-block', fontWeight: 700, color: '#C4982A', fontFamily: 'Georgia,serif', fontSize: '1.1rem' }}>
                              ₹{item.price}
                              <span style={{ fontWeight: 400, fontSize: 11, color: '#8A7A60', marginLeft: 2 }}>/{item.unit}</span>
                            </motion.span>
                          ) : (
                            <Link to="/contact" style={{
                              fontSize: 11, background: '#EEF5FF', color: '#1565C0', padding: '3px 10px',
                              borderRadius: 8, fontWeight: 700, textDecoration: 'none' }}>
                              Contact Us →
                            </Link>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ))}
          </div>
        )}

        {/* Disclaimer */}
        {!loading && categories.length > 0 && (
          <div style={{ marginTop: '2rem', background: '#F2EDE0', border: '1px solid rgba(196,152,42,0.2)',
            borderRadius: 6, padding: '1.2rem 1.5rem' }}>
            <p style={{ color: '#6B5F45', fontSize: 13, margin: 0, lineHeight: 1.8 }}>
              <span style={{ color: '#C4982A', fontWeight: 600 }}>Note:</span>{' '}
              Prices are indicative and vary based on area size, design complexity, and material grade.
              Final estimate will be provided after site visit. GST additional.
              Material + labour both included (except where marked as charges only).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

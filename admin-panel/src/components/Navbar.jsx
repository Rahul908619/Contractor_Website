import { Link, useLocation } from "react-router-dom";

export default function Navbar({ title = "Admin Panel" }) {
  const loc = useLocation();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const hasToken = !!localStorage.getItem("token");
  if (!hasToken) return null;

  const links = [
    { p: "/dashboard", l: "Dashboard", i: "📊" },
    { p: "/gallery",   l: "Gallery",   i: "🖼️" },
    { p: "/services",  l: "Services",  i: "🛠️" },
    { p: "/price",     l: "Pricing",   i: "💰" },
    { p: "/enquiries", l: "Enquiries", i: "📭" },
  ];

  return (
    <nav style={{ background: "#0F172A", borderBottom: "3px solid #4F46E5", padding: "0 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "#4F46E5", color: "#fff", fontWeight: 800, padding: "4px 10px", borderRadius: 6, letterSpacing: 1, fontSize: 14, boxShadow: "0 2px 10px rgba(79,70,229,0.4)" }}>SK</div>
          <h1 style={{ color: "#F8FAFC", fontSize: 18, fontFamily: "'Inter', sans-serif", margin: 0, fontWeight: 700 }}>
            {title}
          </h1>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {links.map(n => {
            const active = loc.pathname === n.p;
            return (
              <Link key={n.p} to={n.p} style={{
                textDecoration: "none", color: active ? "#6366F1" : "#94A3B8",
                background: active ? "rgba(99, 102, 241, 0.15)" : "transparent",
                padding: "8px 12px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s"
              }}>
                <span style={{ fontSize: 16 }}>{n.i}</span> {n.l}
              </Link>
            )
          })}
          <button onClick={handleLogout} style={{
            background: "rgba(239, 68, 68, 0.1)", color: "#EF4444", border: "1px solid rgba(239, 68, 68, 0.2)",
            marginLeft: 12, padding: "8px 16px", borderRadius: 8, fontSize: 13,
            fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s"
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)"}>
            ✖ Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

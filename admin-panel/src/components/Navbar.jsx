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
    <nav style={{ background: "#1A1510", borderBottom: "3px solid #C4982A", padding: "0 1.5rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", height: 60 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ background: "#C4982A", color: "#fff", fontWeight: 700, padding: "2px 8px", borderRadius: 4, letterSpacing: 1, fontSize: 14 }}>SK</div>
          <h1 style={{ color: "#F5F0E6", fontSize: 16, fontFamily: "Georgia,serif", margin: 0 }}>
            {title}
          </h1>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {links.map(n => {
            const active = loc.pathname === n.p;
            return (
              <Link key={n.p} to={n.p} style={{
                textDecoration: "none", color: active ? "#C4982A" : "#8A7A60",
                background: active ? "rgba(196,152,42,0.12)" : "transparent",
                padding: "8px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s"
              }}>
                <span>{n.i}</span> {n.l}
              </Link>
            )
          })}
          <button onClick={handleLogout} style={{
            background: "rgba(255,0,0,0.1)", color: "#EF5350", border: "none",
            marginLeft: 12, padding: "8px 16px", borderRadius: 6, fontSize: 12,
            fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
          }}>
            ✖ Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

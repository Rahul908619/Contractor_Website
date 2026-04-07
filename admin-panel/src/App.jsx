import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login      from "./pages/Login";
import Dashboard  from "./pages/Dashboard";
import Gallery    from "./pages/Gallery";
import Services   from "./pages/Services";
import Enquiries  from "./pages/Enquiries";
import Price      from "./pages/Price";

// FIX: Simple ProtectedRoute — checks for token in localStorage
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* FIX: All admin routes now protected — no token = redirect to login */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/gallery"   element={<ProtectedRoute><Gallery /></ProtectedRoute>} />
        <Route path="/services"  element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
        <Route path="/price"     element={<ProtectedRoute><Price /></ProtectedRoute>} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";
import Enquiries from "./pages/Enquiries";
import Price from "./pages/Price";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/services" element={<Services />} />
        <Route path="/enquiries" element={<Enquiries />} />
        <Route path="/price" element={<Price />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

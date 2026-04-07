const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ── CORS — only allow your 2 frontends ──────────────────────────────────
const allowedOrigins = [
  process.env.FRONTEND_URL,   // public website  e.g. https://sktiles.vercel.app
  process.env.ADMIN_URL,      // admin panel     e.g. https://sk-admin.vercel.app
  "http://localhost:5173",    // local dev website
  "http://localhost:5174",    // local dev admin
  "http://localhost:5000",
  "http://localhost:5001",
];

app.use(cors({
  origin: (origin, callback) => {
    // allow curl / Postman (no origin) during dev
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// ── Routes ───────────────────────────────────────────────────────────────
const authRoutes    = require("./routes/auth.routes");
const galleryRoutes = require("./routes/gallery.routes");
const serviceRoutes = require("./routes/service.routes");
const enquiryRoutes = require("./routes/enquiry.routes");
const priceRoutes   = require("./routes/price.routes");
const chatRoutes    = require("./routes/chat.routes");

app.use("/api/admin",   authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/services",serviceRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/prices",  priceRoutes);
app.use("/api/chat",    chatRoutes);

// ── Health ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.send("SK Tiles & Marbles Backend 🚀"));

// ── 404 ───────────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// ── Global error handler ─────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

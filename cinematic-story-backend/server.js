import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS (MUST be before routes)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://story-genix.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight
app.options("*", cors());

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api", scriptRoutes);

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => {
    console.error("Mongo error:", err);
    process.exit(1);
  });

// ✅ Port (Render provides PORT)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);

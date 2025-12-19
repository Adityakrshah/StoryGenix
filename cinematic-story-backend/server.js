// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import scriptRoutes from "./routes/scriptRoutes.js";
// import mongoose from "mongoose";
// import authRoutes from "./routes/authRoutes.js";





// dotenv.config();
// const app = express();
// app.use("/api/auth", authRoutes);
// app.use(cors());
// app.use(express.json());

// app.use((req, res, next) => {
//   console.log("🔥 Incoming request:", req.method, req.url);
//   next();
// });

// app.use("/api", scriptRoutes);

// const PORT = process.env.PORT || 4000;

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Atlas connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err.message);
//     process.exit(1);
//   });

// app.listen(PORT, () => {
//   console.log(`Backend running on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import scriptRoutes from "./routes/scriptRoutes.js";

dotenv.config();

const app = express();

// 🔴 THIS WAS MISSING / NOT EXECUTING
app.use(cors());
app.use(express.json()); // ✅ REQUIRED

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

app.use("/api/auth", authRoutes);
app.use("/api", scriptRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`)
);

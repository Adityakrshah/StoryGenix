import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scriptRoutes from "./routes/scriptRoutes.js";


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("🔥 Incoming request:", req.method, req.url);
  next();
});

app.use("/api", scriptRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

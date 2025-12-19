import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createScript,
  getHistory,
  deleteScript
} from "../controllers/scriptController.js";

const router = express.Router();

router.post("/generate-script", authMiddleware, createScript);
router.get("/history", authMiddleware, getHistory);
router.delete("/history/:id", authMiddleware, deleteScript);

export default router;

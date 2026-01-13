import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createScript,
  getHistory,
  deleteScript,
  editScript,
} from "../controllers/scriptController.js";


const router = express.Router();

router.post("/generate-script", authMiddleware, createScript);
router.get("/history", authMiddleware, getHistory);
router.post("/scripts/:id/edit", authMiddleware, editScript);
router.delete("/history/:id", authMiddleware, deleteScript);

export default router;

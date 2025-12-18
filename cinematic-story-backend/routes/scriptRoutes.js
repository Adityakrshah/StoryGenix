import express from "express";
import { createScript } from "../controllers/scriptController.js";


const router = express.Router();

router.post("/generate-script", createScript);

export default router;

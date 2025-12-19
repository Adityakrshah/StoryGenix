import { generateAIScript } from "../services/aiService.js";
import Script from "../models/Scripts.js";

export async function createScript(req, res) {
  try {
    const { prompt, language, mood } = req.body;
    const userId = req.userId;

    if (!prompt || !userId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    const script = await generateAIScript(prompt, language);

    await Script.create({
      userId,
      prompt,
      language,
      mood,
      script,
    });

    res.json({ script });
  } catch (error) {
    console.log("❌ Controller Error:", error.message);
    res.status(500).json({ error: "AI failed to generate script" });
  }
}

export async function getHistory(req, res) {
  try {
    const userId = req.userId;

    const scripts = await Script.find({ userId })
      .sort({ createdAt: -1 });

    res.json(scripts);
  } catch (error) {
    console.log("❌ History Error:", error.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
}

export async function deleteScript(req, res) {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const deleted = await Script.deleteOne({
      _id: id,
      userId,
    });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Script not found" });
    }

    res.json({ message: "Script deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error.message);
    res.status(500).json({ message: "Failed to delete script" });
  }
}

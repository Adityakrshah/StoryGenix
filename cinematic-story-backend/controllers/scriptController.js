import { generateAIScript } from "../services/aiService.js"


export async function createScript(req, res) {
  try {
    console.log("📥 Request body:", req.body);

    const { prompt, language } = req.body;

    const script = await generateAIScript(prompt, language);

    res.json({ script });

  } catch (error) {
    console.log("❌ Controller Error:", error.message);
    res.status(500).json({ error: "AI failed to generate script" });
  }
}

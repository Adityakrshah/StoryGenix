import { generateAIScript } from "../services/aiService.js";
import Script from "../models/scripts.js";

export async function createScript(req, res) {
  try {
    const { prompt, language, mood } = req.body;
    const userId = req.userId;

    if (!prompt || !userId) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // Generate AI script
    const aiScript = await generateAIScript(prompt, language);

    // Save script with versions
    const savedScript = await Script.create({
      userId,
      prompt,
      language,
      mood,
      versions: [
        {
          content: aiScript,
          editedFrom: null,
        },
      ],
    });

    // ✅ Send response ONCE, after save
    res.json({
      script: aiScript,
      scriptId: savedScript._id,
    });

  } catch (error) {
    console.error("❌ Controller Error:", error.message);
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
    console.error("❌ History Error:", error.message);
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
export async function editScript(req, res) {
  try {
    const { id } = req.params;
    const { editedPrompt, language } = req.body;
    const userId = req.userId;

    if (!editedPrompt) {
      return res.status(400).json({ message: "Edited prompt required" });
    }

    const scriptDoc = await Script.findOne({ _id: id, userId });
    if (!scriptDoc) {
      return res.status(404).json({ message: "Script not found" });
    }

    const lastVersion =
      scriptDoc.versions[scriptDoc.versions.length - 1];

    const editAwarePrompt = `
EDIT MODE: STRICT (DO NOT REWRITE)

You are editing an EXISTING script.
You MUST treat the original script as the base text.

ORIGINAL_SCRIPT (BASE TEXT — DO NOT REPLACE):
---------------------------------------------
${lastVersion.content}
---------------------------------------------

EDIT_REQUEST (APPLY ONLY THIS):
"${editedPrompt}"

STRICT RULES:
1. Start from ORIGINAL_SCRIPT exactly as given.
2. Modify ONLY the parts required by EDIT_REQUEST.
3. Reuse the same sentences wherever possible.
4. Do NOT invent a new story, scenes, or structure.
5. Do NOT rewrite unaffected sections.
6. Preserve formatting, order, tone, and pacing.
7. Return the FULL SCRIPT after minimal edits.
8. If a section is not mentioned, leave it unchanged.
`;

    const newScript = await generateAIScript(
      editAwarePrompt,
      language || scriptDoc.language
    );

    scriptDoc.versions.push({
      content: newScript,
      editPrompt: editedPrompt,
    });

    await scriptDoc.save();

    res.json({
      message: "Script updated successfully",
      newVersion: newScript,
      previousVersion: lastVersion.content,
    });

  } catch (error) {
    console.error("❌ Edit script error:", error);
    res.status(500).json({ message: "Failed to edit script" });
  }
}






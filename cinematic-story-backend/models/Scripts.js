import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    mood: String,
    language: String,
    script: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Script", scriptSchema);

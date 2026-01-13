import mongoose from "mongoose";

const versionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    editedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

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
    versions: {
      type: [versionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Script", scriptSchema);

import { useState, useEffect, useMemo } from "react";

import api from "../services/api";
import { Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Copy } from "lucide-react";





import { marked } from "marked";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");
  const [mood, setMood] = useState("Emotional");
  const [loading, setLoading] = useState(false);
  const [script, setScript] = useState("");
  
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(false);
  const [editInstruction, setEditInstruction] = useState("");
  const [currentScriptId, setCurrentScriptId] = useState(null);
  const [history, setHistory] = useState([]);
  
const navigate = useNavigate();

const filteredHistory = useMemo(() => {
  if (!search.trim()) return [];
  return history.filter(item =>
    item.prompt.toLowerCase().includes(search.toLowerCase())
  );
}, [search, history]);


  

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await api.get("/api/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to load history for search", err);
    }
  };

  fetchHistory();
}, []);

useEffect(() => {
  const handler = () => resetHome();
  window.addEventListener("reset-home", handler);
  return () => window.removeEventListener("reset-home", handler);
}, []);

  const generateScript = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setScript("");

    try {
      const res = await api.post("/api/generate-script", {
  prompt: `${prompt}. Mood: ${mood}`,
  language,
  mood,
});



      setScript(res.data.script);
setCurrentScriptId(res.data.scriptId);

   

    } catch (err) {
      console.error("Script generation failed", err);
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("✅ Script copied to clipboard");
  } catch (err) {
    alert("❌ Failed to copy");
  }
};
console.log("EDIT CLICKED");
console.log("editInstruction:", editInstruction);
console.log("currentScriptId:", currentScriptId);

const handleEditScript = async () => {
  console.log("EDIT BUTTON CLICKED");
  console.log("currentScriptId:", currentScriptId);

  if (!editInstruction.trim() || !currentScriptId) return;

  try {
    setLoading(true);

    const res = await api.post(
      `/api/scripts/${currentScriptId}/edit`,
      {
        editedPrompt: editInstruction,
        language,
      }
    );

    // Update script with edited version
    setScript(res.data.newVersion);

    // Reset edit UI
    setEditing(false);
    setEditInstruction("");

  } catch (err) {
    console.error("Edit failed", err);
  } finally {
    setLoading(false);
  }
};

 const resetHome = () => {
  setPrompt("");
  setScript("");
  setSearch("");
  setLoading(false);
};



  return (
    <div className="w-full flex justify-center py-6 sm:py-10 px-3 sm:px-4">

      <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-6">

   




       {/* 🔝 Top Utility Bar */}
<div className="flex flex-col sm:grid sm:grid-cols-3 items-center gap-4">

  {/* 🔍 Search (center) */}
 {/* 🔍 Search Bar */}
<div className="flex items-center gap-2 w-full sm:max-w-xl justify-self-center">


  <input
    type="text"
    placeholder="Search inside generated script..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 px-4 py-3 rounded-lg
               bg-neutral-800/80 border border-neutral-700
               text-white placeholder-neutral-500
               focus:outline-none focus:ring-2
               focus:ring-blue-500"
  />

  <div className="p-3 rounded-lg
                bg-neutral-800 border border-neutral-700
                text-neutral-400">
  <Search size={18} />
</div>



</div>


  {/* Empty right spacer (for balance) */}
  <div />
</div>
{filteredHistory.length > 0 && (
  <div className="bg-neutral-900 border border-neutral-700
                  rounded-xl p-4 flex flex-col gap-3">

    <p className="text-sm text-neutral-400">
      Search results ({filteredHistory.length})
    </p>

    {filteredHistory.map(item => (
      <div
        key={item._id}
        className="p-3 rounded-lg bg-neutral-800
                   hover:bg-neutral-700 cursor-pointer transition"
      onClick={() => {
  const latest =
    item.versions[item.versions.length - 1].content;

  setScript(latest);
  setPrompt(item.prompt);
  setCurrentScriptId(item._id);
  setSearch("");
}}

      >
        <p className="text-sm text-neutral-200 font-medium">
          {item.prompt}
        </p>
        <p className="text-xs text-neutral-500">
          {new Date(item.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
)}




        {/* ✍️ Prompt */}
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a cinematic prompt..."
          className="w-full h-36 sm:h-44 bg-neutral-900 border border-neutral-700 px-5 py-4 rounded-xl
                     text-white placeholder-neutral-500 resize-none
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* 🎛️ Controls */}
        <div className="flex flex-col sm:flex-row gap-4">

          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="bg-neutral-900 border border-neutral-700 px-4 py-3 rounded-lg w-full sm:w-auto text-white"
          >
            <option>Emotional</option>
            <option>Inspirational</option>
            <option>Action</option>
            <option>Adventure</option>
            <option>Dark</option>
            <option>Thriller</option>
            <option>Horror</option>
            <option>Fantasy</option>
            <option>Sci-Fi</option>
            <option>Romantic</option>
            <option>Mystery</option>
            <option>Comedy</option>
            <option>Tragic</option>
          </select>

          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="Language"
            className="bg-neutral-900 border border-neutral-700 px-4 py-3 rounded-lg
                       text-white placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-56"
          />

          <button
            onClick={generateScript}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                       px-6 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

        </div>

        {/* 📜 Output */}
        {script && (
  <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 space-y-4">

    {/* Script content */}
    <div
      className="whitespace-pre-wrap leading-relaxed text-neutral-300"
      dangerouslySetInnerHTML={{
        __html: marked(script),
      }}
    />

    {/* Edit button */}
    <button
      onClick={() => setEditing(true)}
      className="text-sm text-blue-400 hover:underline"
    >
      ✏️ Re-write this script
    </button>
    <button
  onClick={() => copyToClipboard(script)}
  className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition"
  title="Copy script"
>
  <Copy size={16} />
  Copy
</button>



  </div>
)}
{editing && (
  <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4 space-y-3">
    
    <textarea
      placeholder="Describe what you want to change (e.g. make it darker, add suspense, shorten ending)"
      value={editInstruction}
      onChange={(e) => setEditInstruction(e.target.value)}
      className="w-full h-28 bg-neutral-900 border border-neutral-700 p-3 rounded-lg
                 text-white placeholder-neutral-500 focus:outline-none"
    />

    <div className="flex gap-3">
      <button
        onClick={handleEditScript}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
      >
        Generate Edited Version
      </button>
      <button
        onClick={() => {
          setEditing(false);
          setEditInstruction("");
        }}
        className="text-sm text-neutral-400 hover:text-neutral-200"
      >
        Cancel
      </button>
    </div>
  </div>
)}



      </div>
    </div>
  );
}

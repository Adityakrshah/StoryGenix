import { useEffect, useState } from "react";
import api from "../services/api";
import { marked } from "marked";
import { Copy } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");


const copyToClipboard = async (text) => {
  await navigator.clipboard.writeText(text);
};


  const getLatestScript = (item) => {
  if (!item.versions || item.versions.length === 0) return "";
  return item.versions[item.versions.length - 1].content || "";
};

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get("/api/history");
      setHistory(res.data);
    } catch (err) {
      console.error("Failed to load history", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this script?"
  );

  if (!confirmDelete) return;

  try {
    await api.delete(`/api/history/${id}`);
    setHistory(prev => prev.filter(item => item._id !== id));
  } catch (err) {
    console.error("Delete failed", err);
  }
};


  // 🔍 FILTER HISTORY
  const filteredHistory = history.filter(item => {
  const script = getLatestScript(item);

  return (
    item.prompt.toLowerCase().includes(search.toLowerCase()) ||
    script.toLowerCase().includes(search.toLowerCase()) ||
    (item.mood || "").toLowerCase().includes(search.toLowerCase())
  );
});


  if (loading) {
    return (
      <div className="text-center text-neutral-400 py-10">
        Loading your stories...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl flex flex-col gap-6">

        <h1 className="text-xl font-semibold text-neutral-200">
          Your History
        </h1>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search by prompt, mood, or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-neutral-900 border border-neutral-700
                     px-4 py-3 rounded-lg text-white
                     placeholder-neutral-500 focus:ring-2
                     focus:ring-blue-500"
        />

        {filteredHistory.length === 0 && (
          <div className="text-center text-neutral-400 py-10">
            No matching stories found.
          </div>
        )}

        {filteredHistory.map(item => {
  const original = item.versions?.[0];
  const edited = item.versions?.[item.versions.length - 1];

  return (
    <div
      key={item._id}
      className="bg-neutral-900 border border-neutral-700
                 rounded-xl p-5 flex flex-col gap-4"
    >
      <div className="text-sm text-neutral-400">
        {new Date(item.createdAt).toLocaleString()}
      </div>

      <div className="text-neutral-200 font-medium">
        Prompt:
        <span className="text-neutral-300 font-normal">
          {" "}{item.prompt}
        </span>
      </div>

      <div className="text-sm text-neutral-400">
        Mood: {item.mood || "—"} | Language: {item.language}
      </div>

      {/* 🆚 COMPARISON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Original */}
        {original && (
  <div className="border border-neutral-700 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <p className="text-xs text-neutral-400">Original</p>

      <button
        onClick={() => copyToClipboard(original.content)}
        className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300"
        title="Copy original script"
      >
        <Copy size={14} />
        Copy
      </button>
    </div>

    <div
      className="whitespace-pre-wrap text-neutral-300"
      dangerouslySetInnerHTML={{
        __html: marked(original.content),
      }}
    />
  </div>
)}


        {/* Edited */}
        {edited && edited !== original && (
  <div className="border border-blue-700 bg-blue-950/20 rounded-lg p-4">
    <div className="flex justify-between items-center mb-2">
      <p className="text-xs text-blue-400">Edited</p>

      <button
        onClick={() => copyToClipboard(edited.content)}
        className="flex items-center gap-1 text-xs text-green-400 hover:text-green-300"
        title="Copy edited script"
      >
        <Copy size={14} />
        Copy
      </button>
    </div>

    {edited.editPrompt && (
      <p className="text-xs text-neutral-400 mb-2 italic">
        Edit prompt: {edited.editPrompt}
      </p>
    )}

    <div
      className="whitespace-pre-wrap text-neutral-300"
      dangerouslySetInnerHTML={{
        __html: marked(edited.content),
      }}
    />
  </div>
)}

      </div>

      {/* 🗑 DELETE */}
      <button
        onClick={() => handleDelete(item._id)}
        className="text-sm text-red-400 hover:underline self-start"
      >
        Delete
      </button>
    </div>
  );
})}

      </div>
    </div>
  );
}

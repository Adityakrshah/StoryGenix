import { useEffect, useState } from "react";
import api from "../services/api";
import { marked } from "marked";


export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [search, setSearch] = useState("");

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
  const filteredHistory = history.filter(item =>
    item.prompt.toLowerCase().includes(search.toLowerCase()) ||
    item.script.toLowerCase().includes(search.toLowerCase()) ||
    (item.mood || "").toLowerCase().includes(search.toLowerCase())
  );

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

        {filteredHistory.map(item => (
          <div
            key={item._id}
            className="bg-neutral-900 border border-neutral-700
                       rounded-xl p-5 flex flex-col gap-3"
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

            {/* 📜 SCRIPT */}
            <div
  className="whitespace-pre-wrap text-neutral-300 border-t border-neutral-700 pt-3"
  dangerouslySetInnerHTML={{
    __html: marked(
      expandedId === item._id
        ? item.script
        : item.script.slice(0, 300) + "..."
    ),
  }}
/>


            {/* 🔽 TOGGLE */}
            <div className="flex gap-4 mt-2">
  <button
    onClick={() =>
      setExpandedId(expandedId === item._id ? null : item._id)
    }
    className="text-sm text-blue-400 hover:underline"
  >
    {expandedId === item._id ? "Collapse" : "View full script"}
  </button>

  <button
    onClick={() => handleDelete(item._id)}
    className="text-sm text-red-400 hover:underline"
  >
    Delete
  </button>
</div>

          </div>
        ))}
      </div>
    </div>
  );
}

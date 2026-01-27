import {
  PlusSquare,
  History,
  Info,
  ArrowLeftRight,
  Film
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();

  // icon sizing logic (unchanged)
  const iconSize = collapsed ? 28 : 22;
  const stroke = collapsed ? 2.5 : 2;

  return (
    <div className="h-full bg-black/30 backdrop-blur-md text-neutral-200 p-4 flex flex-col">

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`mb-6 rounded-lg transition
          ${
            collapsed
              ? "flex justify-center p-1 text-white hover:bg-white/10"
              : "flex items-center gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10"
          }
        `}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ArrowLeftRight size={iconSize} strokeWidth={stroke} />
      </button>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        <button
          onClick={() => navigate("/home")}
          className={`flex items-center rounded-lg transition
            ${
              collapsed
                ? "justify-center p-1 text-white hover:bg-white/10"
                : "gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10"
            }
          `}
        >
          <Film size={iconSize} strokeWidth={stroke} />
          {!collapsed && "Home"}
        </button>

        <button
          onClick={() => navigate("/home")}
          className={`flex items-center rounded-lg transition
            ${
              collapsed
                ? "justify-center p-1 text-white hover:bg-white/10"
                : "gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10"
            }
          `}
        >
          <PlusSquare size={iconSize} strokeWidth={stroke} />
          {!collapsed && "New Script"}
        </button>

        <button
          onClick={() => navigate("/history")}
          className={`flex items-center rounded-lg transition
            ${
              collapsed
                ? "justify-center p-1 text-white hover:bg-white/10"
                : "gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10"
            }
          `}
        >
          <History size={iconSize} strokeWidth={stroke} />
          {!collapsed && "History"}
        </button>

        <button
          onClick={() => navigate("/about")}
          className={`flex items-center rounded-lg transition
            ${
              collapsed
                ? "justify-center p-1 text-white hover:bg-white/10"
                : "gap-3 px-3 py-2 text-neutral-300 hover:bg-white/10"
            }
          `}
        >
          <Info size={iconSize} strokeWidth={stroke} />
          {!collapsed && "About"}
        </button>

      </nav>
    </div>
  );
}

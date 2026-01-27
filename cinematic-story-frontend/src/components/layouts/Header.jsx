import { FaUserCircle } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Menu, ArrowLeftRight } from "lucide-react";
import logo from "../Background/logo.png"

export default function Header({ onToggleSidebar, onMobileMenu }) {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
const location = useLocation();
const showBackButton = location.pathname !== "/home";

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/login");
  };

  // 🔽 CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <header className="h-14 flex items-center justify-between px-6
                       border-b border-neutral-800
                       text-neutral-200 bg-black/40 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          {showBackButton && (
  <button
    onClick={() => navigate(-1)}
    className="text-neutral-300 hover:text-white transition-transform hover:-translate-x-0.5"

    title="Go back"
  >
    <ArrowLeft size={20} />
  </button>
)}


  {/* Mobile menu button */}
  <button onClick={onMobileMenu} className="md:hidden">
  <Menu size={20} />
</button>


  {/* Desktop collapse button
  <button
    onClick={onToggleSidebar}
    className="hidden md:block text-neutral-300 hover:text-white"
  >
    ⇔
  </button> */}
</div>


<h1
  className="font-bold tracking-wide cursor-pointer select-none flex items-center gap-2"
  onClick={() => {
    window.dispatchEvent(new Event("reset-home"));
    navigate("/home");
  }}
>
  <img
    src={logo}
    alt="StoryGenix Logo"
    className="h-10 w-auto"
  /><span>StoryGenix</span>
</h1>


      <div className="relative" ref={dropdownRef}>
        <FaUserCircle
          size={26}
          className="cursor-pointer text-neutral-300 hover:text-white transition"
          onClick={() => setOpen(prev => !prev)}
        />

        {open && (
          <div
            className="absolute right-0 mt-2 w-44
                       bg-neutral-900 border border-neutral-700
                       rounded-xl shadow-lg
                       overflow-hidden animate-fade-in"
          >
            {[
              { label: "Home", path: "/home" },
              { label: "Profile", path: "/profile" },
              { label: "History", path: "/history" },
              { label: "About", path: "/about" },
            ].map(item => (
              <div
                key={item.label}
                onClick={() => goTo(item.path)}
                className="px-4 py-2 text-sm cursor-pointer
                           hover:bg-neutral-800 transition"
              >
                {item.label}
              </div>
            ))}

            <div
              onClick={handleLogout}
              className="px-4 py-2 text-sm cursor-pointer
                         text-red-400 hover:bg-red-800/40 transition"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

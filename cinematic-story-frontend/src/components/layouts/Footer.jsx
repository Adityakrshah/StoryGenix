import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-neutral-800 text-sm text-neutral-500">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row gap-6 md:items-center md:justify-between text-center md:text-left">

        {/* Left */}
        <div className="text-xs text-neutral-600">
          <p className="font-medium">StoryGenix</p>
          <p>A space where imagination takes shape.</p>
        </div>

        {/* Center */}
        <div className="text-center">
          <p className="font-medium text-neutral-400">
            © 2025 StoryGenix. All rights reserved.
          </p>
        </div>

        {/* Right */}
        <div className="flex gap-4 text-xs text-neutral-600 justify-center md:justify-end">
          <span
            className="cursor-pointer hover:text-neutral-300"
            onClick={() => navigate("/about")}
          >
            About
          </span>
          <span
            className="cursor-pointer hover:text-neutral-300"
            onClick={() => navigate("/about")}
          >
            Contact
          </span>
        </div>

      </div>
    </footer>
  );
}

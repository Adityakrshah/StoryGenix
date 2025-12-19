import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 ">
      <h1 className="text-6xl font-bold text-neutral-300">404</h1>

      <p className="mt-4 text-xl font-semibold text-neutral-100">
        Page Not Found
      </p>

      <p className="mt-2 text-neutral-400 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
      >
        <FaArrowLeft />
        Go Back Home
      </button>
    </div>
  );
}

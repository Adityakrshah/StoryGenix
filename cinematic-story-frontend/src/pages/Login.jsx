import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      // 🔐 Save auth globally
      login(res.data.user, res.data.token);

      // 🚀 Redirect to home
      navigate("/home");
    } catch (err) {
  console.error("LOGIN ERROR:", err.message);
  res.status(500).json({ message: "Login failed" });
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-xl p-6">

        <h1 className="text-2xl font-semibold mb-6 text-center">
          Login to StoryGenix
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg
                       text-white placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-neutral-800 border border-neutral-700 px-4 py-3 rounded-lg
                       text-white placeholder-neutral-500
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60
                       px-4 py-3 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-neutral-400">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 hover:underline"
          >
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

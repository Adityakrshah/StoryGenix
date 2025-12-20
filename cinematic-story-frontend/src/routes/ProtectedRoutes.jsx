import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  // ⏳ Wait for auth restoration
  if (loading) return null; // or a spinner

  // 🔐 Not authenticated
  if (!token) return <Navigate to="/login" replace />;

  return children;
}

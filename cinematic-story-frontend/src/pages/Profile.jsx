import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/auth/me")
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-center text-neutral-400 py-10">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl flex flex-col gap-6">

        <h1 className="text-xl font-semibold text-neutral-200">Profile</h1>

        <div className="bg-neutral-900 border border-neutral-700 rounded-xl p-6 flex flex-col gap-4">

          <div>
            <p className="text-sm text-neutral-400">Username</p>
            <p className="font-medium text-neutral-200">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-400">Email</p>
            <p className="font-medium text-neutral-200">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-neutral-400">Account Status</p>
            <p className="font-medium text-green-400">
              Authenticated account
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700
                     px-6 py-3 rounded-lg font-semibold transition w-fit"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

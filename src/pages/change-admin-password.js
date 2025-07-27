import { useState } from "react";
import { apiRequest } from "@/services/api";

export default function ChangeAdminPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await apiRequest("/api/auth/change-admin-password", "POST", {
        email: "admin@gmail.com",
        oldPassword,
        newPassword,
      });
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <form className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Change Admin Password</h2>
        {success && <div className="text-green-600 mb-4">Password changed successfully!</div>}
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold"
          disabled={loading}
        >
          {loading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

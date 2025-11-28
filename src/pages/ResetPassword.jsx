import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams(); // read token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      setErrorMsg("Passwords do not match");
      return;
    }

    try {
      const res = await api.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (res.data.success) {
        setSuccessMsg("Password updated successfully");
        setErrorMsg("");

        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form className="card w-full max-w-md" onSubmit={handleReset}>
        <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-2 mb-3 rounded">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 bg-green-100 p-2 mb-3 rounded">
            {successMsg}
          </p>
        )}

        {/* New Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">New Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            className="input"
            type="password"
            placeholder="Confirm new password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        <button className="btn mt-2">Update Password</button>
      </form>
    </div>
  );
}

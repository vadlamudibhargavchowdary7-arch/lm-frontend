import { useState } from "react";
import api from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", { email });

      if (res.data.success) {
        setSuccessMsg("Password reset link sent to your email.");
        setErrorMsg("");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to send reset link");
      setSuccessMsg("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form className="card w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Forgot Password</h1>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-3">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 bg-green-100 p-2 rounded mb-3">{successMsg}</p>
        )}

        <div className="mb-4">
          <label className="block font-medium mb-1">Enter Your Email</label>
          <input
            className="input"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button className="btn mt-2">Send Reset Link</button>

        <div className="mt-4 text-center">
          <a href="/login" className="text-primary hover:underline">
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
}

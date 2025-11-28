import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Extract role from query (?role=manager)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedRole = params.get("role") || "employee";
    setRole(selectedRole);
  }, [location.search]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      if (res.data.success) {
        const { token, user } = res.data.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        if (user.role === "employee") navigate("/employee");
        else if (user.role === "manager") navigate("/manager");
        else navigate("/admin");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        className="card w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login as {role}</h1>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-2 mb-3 rounded">{errorMsg}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn mt-2">Login</button>

        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-primary hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a
              href={`/signup?role=${role}`}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="w-full py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
}

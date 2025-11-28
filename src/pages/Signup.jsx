import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState("employee");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Read role from URL (signup?role=manager)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setRole(params.get("role") || "employee");
  }, [location.search]);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/signup", {
        name,
        email,
        password,
        department,
        role,
      });

      if (res.data.success) {
        setSuccessMsg("Signup successful! Wait for Admin approval.");
        setErrorMsg("");
        setName("");
        setEmail("");
        setPassword("");
        setDepartment("");

        setTimeout(() => navigate("/login?role=" + role), 1500);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Signup failed");
      setSuccessMsg("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form className="card w-full max-w-md" onSubmit={handleSignup}>
        <h1 className="text-2xl font-bold mb-6 text-center">
          Sign Up as {role}
        </h1>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-2 rounded mb-3">
            {errorMsg}
          </p>
        )}

        {successMsg && (
          <p className="text-green-600 bg-green-100 p-2 rounded mb-3">
            {successMsg}
          </p>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            className="input"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            className="input"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Department */}
        {(role === "employee" || role === "manager") && (
          <div className="mb-4">
            <label className="block font-medium mb-1">Department</label>
            <input
              className="input"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
        )}

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            className="input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="btn mt-2">Sign Up</button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href={`/login?role=${role}`}
              className="text-primary hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

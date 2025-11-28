import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [pendingUsers, setPendingUsers] = useState([]);
  const [policies, setPolicies] = useState([]);

  // -------- Logout --------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login?role=admin");
  };

  // -------- Load pending users --------
  const loadPendingUsers = async () => {
    try {
      const res = await api.get("/admin/pending-users");
      if (res.data.success) setPendingUsers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // -------- Approve or Reject User --------
  const handleUserAction = async (id, action) => {
    try {
      await api.post(`/admin/users/${id}/${action}`);
      loadPendingUsers();
    } catch (err) {
      console.error("Action failed", err);
    }
  };

  // -------- Load Policies --------
  const loadPolicies = async () => {
    try {
      const res = await api.get("/admin/policies");
      if (res.data.success) setPolicies(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // -------- Initial Load --------
  useEffect(() => {
    loadPendingUsers();
    loadPolicies();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-primary">Admin Panel</h2>

        <nav className="space-y-4">
          <button
            onClick={() => navigate("/admin")}
            className="w-full text-left px-3 py-2 bg-primary text-white rounded hover:bg-blue-800"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="w-full text-left px-3 py-2 bg-slate-200 rounded hover:bg-slate-300"
          >
            Organization Calendar
          </button>
        </nav>

        <button
          onClick={logout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.name || "Admin"}
        </h1>

        <p className="text-gray-600 mb-6">
          Manage users, approve requests, and control organization leave policies.
        </p>

        {/* Pending Users */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Pending User Approvals</h2>

          {pendingUsers.length === 0 ? (
            <p className="text-gray-500">No pending approvals</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((u) => (
                <div key={u._id} className="card">
                  <h3 className="font-bold">{u.name}</h3>
                  <p className="text-gray-600 text-sm">{u.email}</p>
                  <p className="text-gray-600 text-sm">Role: {u.role}</p>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleUserAction(u._id, "approve")}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleUserAction(u._id, "reject")}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Policy Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Leave Policies</h2>

          {policies.length === 0 ? (
            <p className="text-gray-500">No policies created</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {policies.map((p) => (
                <div key={p._id} className="card">
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <p className="text-gray-600 mt-2">{p.description}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Effective: {p.effectiveFrom?.slice(0, 10)} →{" "}
                    {p.effectiveTo?.slice(0, 10)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

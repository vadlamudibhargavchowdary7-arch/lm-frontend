import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const [pendingLeaves, setPendingLeaves] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login?role=manager");
  };

  // Fetch pending leave requests
  const loadPendingLeaves = async () => {
    try {
      const res = await api.get("/leaves/manager/pending");
      if (res.data.success) {
        setPendingLeaves(res.data.data);
      }
    } catch (err) {
      console.error("Error loading leaves", err);
    }
  };

  // Approve / Reject leave
  const handleDecision = async (id, decision) => {
    try {
      await api.post(`/leaves/manager/${id}/decision`, { decision });
      loadPendingLeaves();
    } catch (err) {
      console.error("Decision error", err);
    }
  };

  useEffect(() => {
    loadPendingLeaves();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-primary">Manager Panel</h2>

        <nav className="space-y-4">
          <button
            onClick={() => navigate("/manager")}
            className="w-full text-left px-3 py-2 bg-primary text-white rounded hover:bg-blue-800"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="w-full text-left px-3 py-2 bg-slate-200 rounded hover:bg-slate-300"
          >
            Team Calendar
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
        <h1 className="text-3xl font-bold mb-4">
          Welcome, {user?.name || "Manager"}
        </h1>

        <p className="text-gray-600 mb-6">
          Review team leave requests, manage approval, and view team schedule.
        </p>

        {/* Pending Leave Requests */}
        <h2 className="text-xl font-semibold mb-4">Pending Leave Requests</h2>

        {pendingLeaves.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {pendingLeaves.map((leave) => (
              <div key={leave._id} className="card">
                <h3 className="font-bold">{leave.employee.name}</h3>

                <p className="text-gray-600 mt-1 text-sm">
                  {leave.type.toUpperCase()} leave — {leave.days} days
                </p>

                <p className="text-gray-500 text-sm">
                  {leave.startDate?.slice(0, 10)} → {leave.endDate?.slice(0, 10)}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleDecision(leave._id, "approve")}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleDecision(leave._id, "reject")}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function EmployeeDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login?role=employee");
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h2 className="text-xl font-bold text-primary">Employee Panel</h2>

        <nav className="space-y-4">
          <button
            onClick={() => navigate("/apply-leave")}
            className="w-full text-left px-3 py-2 bg-primary text-white rounded hover:bg-blue-800"
          >
            Apply Leave
          </button>

          <button
            onClick={() => navigate("/calendar")}
            className="w-full text-left px-3 py-2 bg-slate-200 rounded hover:bg-slate-300"
          >
            Team Calendar
          </button>

          <button
            onClick={() => navigate("/employee")}
            className="w-full text-left px-3 py-2 bg-slate-200 rounded hover:bg-slate-300"
          >
            Dashboard
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
          Welcome, {user?.name || "Employee"}
        </h1>

        <p className="text-gray-600 mb-6">
          Here you can apply for leaves, view your calendar, and manage your profile.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="card">
            <h3 className="text-xl font-semibold">Leave Balance</h3>
            <ul className="mt-2 text-gray-600">
              <li>Paid Leaves: {user?.leaveBalance?.paid ?? 12}</li>
              <li>Sick Leaves: {user?.leaveBalance?.sick ?? 8}</li>
              <li>Casual Leaves: {user?.leaveBalance?.casual ?? 5}</li>
            </ul>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold">Quick Actions</h3>
            <button
              onClick={() => navigate("/apply-leave")}
              className="btn mt-4"
            >
              Apply Leave
            </button>
          </div>

          <div className="card">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Notifications will appear here (Socket.io support ready).
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

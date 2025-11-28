
import { Link } from "react-router-dom";

export default function RoleSelect() {
  const roles = [
    { name: "Employee", role: "employee" },
    { name: "Manager", role: "manager" },
    { name: "Admin", role: "admin" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="card w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Select Your Role</h1>

        <div className="space-y-4">
          {roles.map((r) => (
            <Link
              key={r.role}
              to={`/login?role=${r.role}`}
              className="block bg-primary text-white py-3 rounded hover:bg-blue-800"
            >
              {r.name}
            </Link>
          ))}
        </div>

        <p className="mt-6 text-gray-600 text-sm">
          You can sign up or log in depending on your role.
        </p>
      </div>
    </div>
  );
}

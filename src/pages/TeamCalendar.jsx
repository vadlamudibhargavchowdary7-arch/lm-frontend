import { useEffect, useState } from "react";
import api from "../utils/api";

export default function TeamCalendar() {
  const [leaves, setLeaves] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const loadLeaves = async () => {
    try {
      const res = await api.get("/leaves/all"); 
      if (res.data.success) {
        setLeaves(res.data.data);
      }
    } catch (err) {
      setErrorMsg("Unable to load leave calendar");
      console.error(err);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-slate-100">
      <h1 className="text-3xl font-bold mb-4">Team Leave Calendar</h1>

      {errorMsg && (
        <p className="text-red-600 bg-red-100 p-2 rounded max-w-lg">
          {errorMsg}
        </p>
      )}

      {leaves.length === 0 ? (
        <p className="text-gray-600 mt-4">No team leaves available.</p>
      ) : (
        <div className="space-y-4 mt-6 max-w-2xl">
          {leaves.map((l) => (
            <div key={l._id} className="card">
              <h3 className="font-bold">{l.employee?.name || "Employee"}</h3>

              <p className="text-blue-700 font-medium mt-1">
                {l.type.toUpperCase()} — {l.days} day(s)
              </p>

              <p className="text-gray-600 text-sm mt-1">
                {l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Status: <span className="font-semibold">{l.status}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

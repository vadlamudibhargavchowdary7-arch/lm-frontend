import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function ApplyLeave() {
  const navigate = useNavigate();

  const [type, setType] = useState("paid");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(0);
  const [reason, setReason] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Auto Calculate Days
  const calculateDays = (s, e) => {
    if (!s || !e) return 0;

    const start = new Date(s);
    const end = new Date(e);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    return diff > 0 ? diff : 0;
  };

  const handleApply = async (e) => {
    e.preventDefault();

    if (days <= 0) {
      setErrorMsg("End date must be after start date");
      return;
    }

    try {
      const res = await api.post("/leaves/apply", {
        type,
        startDate,
        endDate,
        days,
        reason
      });

      if (res.data.success) {
        setSuccessMsg("Leave applied successfully!");
        setErrorMsg("");

        setTimeout(() => navigate(-1), 1200);
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to apply leave");
    }
  };

  // Calculate days whenever dates change
  const onDateChange = (field, value) => {
    if (field === "start") setStartDate(value);
    if (field === "end") setEndDate(value);

    const calculated = calculateDays(
      field === "start" ? value : startDate,
      field === "end" ? value : endDate
    );

    setDays(calculated);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form className="card w-full max-w-lg" onSubmit={handleApply}>
        <h1 className="text-2xl font-bold text-center mb-6">Apply for Leave</h1>

        {errorMsg && (
          <p className="text-red-600 bg-red-100 p-2 mb-3 rounded">{errorMsg}</p>
        )}

        {successMsg && (
          <p className="text-green-600 bg-green-100 p-2 mb-3 rounded">
            {successMsg}
          </p>
        )}

        {/* Type */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Leave Type</label>
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="paid">Paid Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => onDateChange("start", e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => onDateChange("end", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Days */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Total Days</label>
          <input className="input" value={days} readOnly />
        </div>

        {/* Reason */}
        <div className="mt-4">
          <label className="block font-medium mb-1">Reason</label>
          <textarea
            className="input h-24"
            placeholder="Explain the reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button className="btn mt-4">Submit Leave</button>
      </form>
    </div>
  );
}

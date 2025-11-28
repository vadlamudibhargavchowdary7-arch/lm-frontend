import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar(){
  return (
    <div className="w-64 bg-white min-h-screen shadow p-4">
      <div className="text-xl font-semibold mb-6">LMS</div>
      <nav className="space-y-3">
        <Link to="/employee" className="block py-2 px-3 rounded hover:bg-slate-50">Dashboard</Link>
        <Link to="/apply" className="block py-2 px-3 rounded hover:bg-slate-50">Apply Leave</Link>
        <Link to="/team-calendar" className="block py-2 px-3 rounded hover:bg-slate-50">Team Calendar</Link>
        <Link to="/logout" className="block py-2 px-3 rounded hover:bg-slate-50">Logout</Link>
      </nav>
    </div>
  );
}

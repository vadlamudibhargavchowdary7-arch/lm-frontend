import React from 'react';

export default function Navbar(){
  return (
    <div className="w-full bg-white shadow px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-full h-10 w-10 border-2 border-primary"></div>
        <input placeholder="Search here" className="input w-80" />
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-slate-100">🔔</button>
        <div className="flex items-center gap-2">
          <img src="/assets/avatar-placeholder.png" alt="avatar" className="h-8 w-8 rounded-full" />
          <div>VBC ▾</div>
        </div>
      </div>
    </div>
  );
}

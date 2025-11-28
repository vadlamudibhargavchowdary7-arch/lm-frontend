import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function TeamCalendar(){
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 max-w-6xl mx-auto">
          <div className="card">
            <h2 className="text-xl font-semibold">Team Calendar</h2>
            <div className="mt-4 h-96 flex items-center justify-center text-gray-400">[Calendar placeholder — integrate FullCalendar or similar]</div>
          </div>
        </div>
      </div>
    </div>
  );
}

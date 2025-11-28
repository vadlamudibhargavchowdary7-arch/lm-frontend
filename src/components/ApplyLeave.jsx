import React, { useState } from 'react';
import API from '../services/api';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function ApplyLeave(){
  const [form, setForm] = useState({ type: 'paid', startDate:'', endDate:'', days:1, reason:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await API.post('/leaves/apply', form);
      setMsg('Leave applied.');
      setTimeout(()=>nav('/employee'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 max-w-2xl mx-auto card">
          <h2 className="text-xl font-semibold mb-3">Apply Leave</h2>
          {msg && <div className="text-green-600 mb-3">{msg}</div>}
          <form onSubmit={submit} className="space-y-3">
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="input">
              <option value="paid">Paid</option>
              <option value="sick">Sick</option>
              <option value="casual">Casual</option>
            </select>
            <div className="grid grid-cols-2 gap-3">
              <input type="date" value={form.startDate} onChange={e=>setForm({...form,startDate:e.target.value})} className="input" required />
              <input type="date" value={form.endDate} onChange={e=>setForm({...form,endDate:e.target.value})} className="input" required />
            </div>
            <input type="number" min="1" value={form.days} onChange={e=>setForm({...form,days:e.target.value})} className="input" />
            <textarea placeholder="Reason" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} className="input"></textarea>
            <button className="btn">Apply</button>
          </form>
        </div>
      </div>
    </div>
  );
}

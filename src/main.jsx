import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoleSelect from './pages/RoleSelect';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ApplyLeave from './pages/ApplyLeave';
import TeamCalendar from './pages/TeamCalendar';
import './styles/index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/apply" element={<ApplyLeave />} />
        <Route path="/team-calendar" element={<TeamCalendar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

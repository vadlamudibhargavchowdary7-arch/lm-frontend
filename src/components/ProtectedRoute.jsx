import React from 'react';
import { Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function ProtectedRoute({ children, roles = [] }){
  const token = localStorage.getItem('token');
  if(!token) return <Navigate to="/" replace />;
  try {
    const decoded = jwtDecode(token);
    if(roles.length && !roles.includes(decoded.role)) return <Navigate to="/" replace />;
    return children;
  } catch (err) {
    return <Navigate to="/" replace />;
  }
}

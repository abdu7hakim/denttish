import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../../api';

export default function ProtectedRoute({ children }) {
  const token = getAdminToken();
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

export function logout() {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin/login';
}

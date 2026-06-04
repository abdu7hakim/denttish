import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../../api';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('adminToken') || getAdminToken();
  if (!token) return <Navigate to="/admin/login" replace />;
  return children;
}

export function logout() {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminEmail');
  window.location.href = '/admin/login';
}

export function getAdminTokenFromStorage() {
  return localStorage.getItem('adminToken');
}

export function getAdminEmail() {
  return localStorage.getItem('adminEmail');
}

const API_BASE = import.meta.env.VITE_API_URL || '/api';

let adminToken = localStorage.getItem('denttish_adminToken') || '';

export function setAdminToken(token) {
  adminToken = token;
  if (token) localStorage.setItem('denttish_adminToken', token);
  else localStorage.removeItem('denttish_adminToken');
}

export function getAdminToken() { return adminToken; }

async function req(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  if (adminToken) opts.headers['Authorization'] = `Bearer ${adminToken}`;
  try {
    const res = await fetch(`${API_BASE}${path}`, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function reqAuth(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  if (adminToken) opts.headers['Authorization'] = `Bearer ${adminToken}`;
  try {
    const res = await fetch(`${API_BASE}${path}`, opts);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export const apiRegister = (name, phone) => req('POST', '/auth/register', { name, phone });
export const apiLogin = (name, phone) => req('POST', '/auth/login', { name, phone });
export const apiAdminLogin = (username, password) => req('POST', '/auth/admin-login', { username, password });

export const apiGetDoctors = () => req('GET', '/doctors');
export const apiAddDoctor = (data) => reqAuth('POST', '/doctors', data);
export const apiUpdateDoctor = (id, data) => reqAuth('PUT', `/doctors/${id}`, data);
export const apiDeleteDoctor = (id) => reqAuth('DELETE', `/doctors/${id}`);

export const apiGetAppointments = (phone) => req('GET', `/appointments${phone ? `?phone=${encodeURIComponent(phone)}` : ''}`);
export const apiAddAppointment = (data) => req('POST', '/appointments', data);
export const apiUpdateAppointment = (id, data) => reqAuth('PUT', `/appointments/${id}`, data);
export const apiDeleteAppointment = (id) => reqAuth('DELETE', `/appointments/${id}`);

export const apiGetUsers = () => reqAuth('GET', '/users');

export const apiGetNotifications = (target) => req('GET', `/notifications?target=${encodeURIComponent(target)}`);
export const apiMarkRead = (id) => reqAuth('POST', '/notifications/mark-read', { id });
export const apiMarkAllRead = () => reqAuth('POST', '/notifications/mark-all-read');

export const apiGetSettings = () => req('GET', '/settings');
export const apiUpdateSettings = (data) => reqAuth('PUT', '/settings', data);

export const apiGetCategories = () => req('GET', '/categories');
export const apiAddCategory = (name) => reqAuth('POST', '/categories', { name });
export const apiDeleteCategory = (name) => reqAuth('DELETE', `/categories/${encodeURIComponent(name)}`);

export const apiGetStatistics = () => req('GET', '/statistics');

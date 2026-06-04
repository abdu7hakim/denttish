const API_BASE = import.meta.env.VITE_API_URL || '/api';

let adminToken = localStorage.getItem('denttish_adminToken') || '';

export function setAdminToken(token) {
  adminToken = token;
  if (token) localStorage.setItem('denttish_adminToken', token);
  else localStorage.removeItem('denttish_adminToken');
}

export function getAdminToken() { return adminToken; }

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function req(method, path, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  if (adminToken) opts.headers['Authorization'] = `Bearer ${adminToken}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${API_BASE}${path}`, opts);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error || 'Request failed');
      }
      return await res.json();
    } catch (e) {
      if (e.message.includes('Failed to fetch') || e.message.includes('NetworkError')) {
        if (attempt === 0) { await sleep(500); continue; }
        return null;
      }
      throw e;
    }
  }
}

// Auth
export const apiRegister = (name, phone) => req('POST', '/auth/register', { name, phone });
export const apiLogin = (name, phone) => req('POST', '/auth/login', { name, phone });
export const apiAdminLogin = (username, password) => req('POST', '/auth/admin-login', { username, password });

// Doctors
export const apiGetDoctors = () => req('GET', '/doctors');
export const apiAddDoctor = (data) => req('POST', '/doctors', data);
export const apiUpdateDoctor = (id, data) => req('PUT', `/doctors/${id}`, data);
export const apiDeleteDoctor = (id) => req('DELETE', `/doctors/${id}`);

// Appointments
export const apiGetAppointments = (phone) => req('GET', `/appointments${phone ? `?phone=${encodeURIComponent(phone)}` : ''}`);
export const apiAddAppointment = (data) => req('POST', '/appointments', data);
export const apiUpdateAppointment = (id, data) => req('PUT', `/appointments/${id}`, data);
export const apiDeleteAppointment = (id) => req('DELETE', `/appointments/${id}`);

// Users
export const apiGetUsers = () => req('GET', '/users');

// Notifications
export const apiGetNotifications = (target) => req('GET', `/notifications?target=${encodeURIComponent(target)}`);
export const apiMarkRead = (id) => req('POST', '/notifications/mark-read', { id });
export const apiMarkAllRead = () => req('POST', '/notifications/mark-all-read');

// Settings
export const apiGetSettings = () => req('GET', '/settings');
export const apiUpdateSettings = (data) => req('PUT', '/settings', data);

// Categories
export const apiGetCategories = () => req('GET', '/categories');
export const apiAddCategory = (name) => req('POST', '/categories', { name });
export const apiDeleteCategory = (name) => req('DELETE', `/categories/${encodeURIComponent(name)}`);

// Statistics
export const apiGetStatistics = () => req('GET', '/statistics');

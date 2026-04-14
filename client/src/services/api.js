import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://my-portfolio-backend-67aw.onrender.com/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL
});

// Add token to all requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Projects API - use 'api' instead of 'axios'
export const projectsAPI = {
    getAll: () => api.get('/projects'),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post('/projects', data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`)
};

// Services API
export const servicesAPI = {
    getAll: () => api.get('/services'),
    getById: (id) => api.get(`/services/${id}`),
    create: (data) => api.post('/services', data),
    update: (id, data) => api.put(`/services/${id}`, data),
    delete: (id) => api.delete(`/services/${id}`)
};

// References API
export const referencesAPI = {
    getAll: () => api.get('/references'),
    getById: (id) => api.get(`/references/${id}`),
    create: (data) => api.post('/references', data),
    update: (id, data) => api.put(`/references/${id}`, data),
    delete: (id) => api.delete(`/references/${id}`)
};

// Users API
export const usersAPI = {
    getAll: () => api.get('/users'),
    getById: (id) => api.get(`/users/${id}`),
    create: (data) => api.post('/users', data),
    update: (id, data) => api.put(`/users/${id}`, data),
    delete: (id) => api.delete(`/users/${id}`)
};
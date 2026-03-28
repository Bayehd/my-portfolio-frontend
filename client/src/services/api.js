import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Projects API
export const projectsAPI = {
    getAll: () => axios.get(`${API_URL}/projects`),
    getById: (id) => axios.get(`${API_URL}/projects/${id}`),
    create: (data) => axios.post(`${API_URL}/projects`, data),
    update: (id, data) => axios.put(`${API_URL}/projects/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/projects/${id}`)
};

// Services API
export const servicesAPI = {
    getAll: () => axios.get(`${API_URL}/services`),
    getById: (id) => axios.get(`${API_URL}/services/${id}`),
    create: (data) => axios.post(`${API_URL}/services`, data),
    update: (id, data) => axios.put(`${API_URL}/services/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/services/${id}`)
};

// References API
export const referencesAPI = {
    getAll: () => axios.get(`${API_URL}/references`),
    getById: (id) => axios.get(`${API_URL}/references/${id}`),
    create: (data) => axios.post(`${API_URL}/references`, data),
    update: (id, data) => axios.put(`${API_URL}/references/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/references/${id}`)
};

// Users API
export const usersAPI = {
    getAll: () => axios.get(`${API_URL}/users`),
    getById: (id) => axios.get(`${API_URL}/users/${id}`),
    create: (data) => axios.post(`${API_URL}/users`, data),
    update: (id, data) => axios.put(`${API_URL}/users/${id}`, data),
    delete: (id) => axios.delete(`${API_URL}/users/${id}`)
};
// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  // Use the environment variable here
  baseURL: process.env.REACT_APP_API_BASE_URL, 
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

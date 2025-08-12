// src/api/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://quizapp-backend-7kok.onrender.com', // Adjust this to your backend server URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

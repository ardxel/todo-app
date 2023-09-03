import axios from 'axios';
import config from '../env-config';

export const http = axios.create({
  baseURL: config.getEnv('API_URL'),
});

http.interceptors.request.use((request) => {
  const token = localStorage.getItem('token') || '';
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

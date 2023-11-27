import axios, { InternalAxiosRequestConfig } from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL as string;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (localStorage.getItem('accessToken')) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  }

  return config;
})

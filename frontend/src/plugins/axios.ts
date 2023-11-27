import axios, { InternalAxiosRequestConfig } from 'axios';
import LocalStorage from '@/js/helpers/localStorage';
import { PageTranslation } from '@/utils/Enums';
import cookies from '@/js/helpers/cookies';

const searchParam = new URLSearchParams(window.location.search).get('lang')

axios.defaults.baseURL = process.env.VITE_BASE_API_URL as string;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept-Language'] = searchParam ?? (LocalStorage.get('i18nextLng') as string || PageTranslation.TR)

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${LocalStorage?.get('accessToken') || cookies?.getCookie('accessToken')}`;
  return config;
})
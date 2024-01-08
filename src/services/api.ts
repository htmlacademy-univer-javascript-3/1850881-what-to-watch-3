import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {BACKEND_URL, REQUEST_MILLISECONDS_TIMEOUT} from '../constants.ts';
import {getToken} from './token.ts';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_MILLISECONDS_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.headers) {
      return config;
    }

    const token = getToken();
    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};

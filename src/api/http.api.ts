import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';
import axios from 'axios';

export const httpApi = axios.create({
  baseURL: 'http://localhost:8080/v1/',
  timeout: 10000,
  withCredentials: false,
});

httpApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${readToken()}` };

  return config;
});

httpApi.interceptors.response.use(undefined, (error: any) => {
  throw new ApiError<ApiErrorData>(error.response?.data?.message || error.message, error.response?.data);
});

export interface ApiErrorData {
  message: string;
}

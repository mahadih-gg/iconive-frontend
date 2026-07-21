import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import env from "@/lib/env";
import { useAuthStore } from "@/store/auth.store";

export const api = axios.create({
  baseURL: env.apiUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url ?? "";
  if (url.startsWith("/auth")) {
    return config;
  }
  const token = useAuthStore.getState().token;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

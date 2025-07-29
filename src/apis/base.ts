/**
 * Base API Configuration
 * Centralized API configuration and common request setup
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from '../config/env';
import { API_TIMEOUTS } from '../constants';

// Create base axios instance
const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: API_TIMEOUTS.DEFAULT,
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add any common request modifications here
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      // Handle common errors here
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create API instances
export const mainApi = createApiInstance(env.API_BASE_URL);
export const imagesApi = createApiInstance(env.IMAGES_API_URL);

// Common API request wrapper
export const apiRequest = async <T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload progress callback type
export type UploadProgressCallback = (progress: number) => void;

// Common upload configuration
export const createUploadConfig = (
  onUploadProgress?: UploadProgressCallback,
  timeout: number = API_TIMEOUTS.UPLOAD
): AxiosRequestConfig => ({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': 'true',
  },
  timeout,
  onUploadProgress: onUploadProgress ? (progressEvent) => {
    if (progressEvent.total) {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      onUploadProgress(progress);
    }
  } : undefined,
});
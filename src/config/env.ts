/**
 * Environment Configuration
 * Centralized configuration for environment variables
 */

interface EnvConfig {
  API_BASE_URL: string;
  IMAGES_API_URL: string;
  ENVIRONMENT: 'development' | 'production' | 'staging';
  APP_NAME: string;
  APP_VERSION: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined`);
  }
  return value;
};

export const env: EnvConfig = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'https://8a514a18a875.ngrok-free.app'),
  IMAGES_API_URL: getEnvVar('VITE_IMAGES_API_URL', 'https://8a514a18a875.ngrok-free.app'),
  ENVIRONMENT: (getEnvVar('VITE_ENVIRONMENT', 'development') as EnvConfig['ENVIRONMENT']),
  APP_NAME: getEnvVar('VITE_APP_NAME', 'CValue'),
  APP_VERSION: getEnvVar('VITE_APP_VERSION', '1.0.0'),
};

// Validate environment on module load
if (env.ENVIRONMENT === 'production' && !import.meta.env.VITE_API_BASE_URL) {
  console.warn('Production environment detected but API_BASE_URL not explicitly set');
}

export default env;
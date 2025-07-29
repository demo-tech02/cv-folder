/**
 * Application Constants
 * Centralized constants used throughout the application
 */

export const ROUTES = {
  HOME: '/',
  ORDER: '/order/:serviceType',
  PREVIEW: '/preview',
  COVER_LETTER_PREVIEW: '/cover-letter-preview',
} as const;

export const SERVICE_TYPES = {
  CV: 'cv',
  LINKEDIN: 'linkedin',
  COVER_LETTER: 'cover-letter',
  BUNDLE: 'bundle',
} as const;

export const SUPPORTED_FILE_TYPES = {
  PDF: 'application/pdf',
} as const;

export const FILE_CONSTRAINTS = {
  MAX_SIZE: 30 * 1024 * 1024, // 30MB
  SUPPORTED_TYPES: [SUPPORTED_FILE_TYPES.PDF],
} as const;

export const PAYMENT_CONFIG = {
  DEFAULT_AMOUNT: 10,
  CURRENCY: 'USD',
} as const;

export const API_TIMEOUTS = {
  DEFAULT: 30000, // 30 seconds
  UPLOAD: 60000, // 1 minute
  COVER_LETTER: 120000, // 2 minutes
} as const;

export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;
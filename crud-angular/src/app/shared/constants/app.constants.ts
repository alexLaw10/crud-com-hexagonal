export const APP_CONSTANTS = {
  API: {
    BASE_URL: 'http://localhost:3000/api',
    TIMEOUT: 5000
  },
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_PASSWORD_LENGTH: 8,
    MAX_NAME_LENGTH: 100
  },
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
  }
} as const;

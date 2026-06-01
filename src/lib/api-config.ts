/**
 * API Configuration
 *
 * In development, this defaults to http://localhost:5005.
 * In production, it uses the VITE_API_URL environment variable.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/v1/auth/login`,
    REGISTER: `${API_BASE_URL}/api/v1/auth/register`,
  },
  DASHBOARD: {
    STATS: `${API_BASE_URL}/api/v1/dashboard`,
    MIGRATE: `${API_BASE_URL}/api/v1/dashboard/migrate`,
  },
  ENQUIRIES: `${API_BASE_URL}/api/v1/enquiries`,
  YATRAS: `${API_BASE_URL}/api/v1/yatras`,
  TEERTHAS: `${API_BASE_URL}/api/v1/teerthas`,
  TESTIMONIALS: `${API_BASE_URL}/api/v1/testimonials`,
  BLOGS: `${API_BASE_URL}/api/v1/blogs`,
};

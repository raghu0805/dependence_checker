const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://dependence-checker.onrender.com';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/api/health`,
  SCAN_UPLOAD: `${API_BASE_URL}/api/scan/upload`,
  SCAN_JSON: `${API_BASE_URL}/api/scan/json`,
  HISTORY: `${API_BASE_URL}/api/history`,
  EXPLAIN: `${API_BASE_URL}/api/explain`,
  EXPLAIN_REPORT: `${API_BASE_URL}/api/explain-report`,
};

export default API_BASE_URL;

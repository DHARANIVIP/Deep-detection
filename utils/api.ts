// Reads VITE_API_BASE_URL at build time.
// In development: empty string (uses Vite proxy -> localhost:8000)
// In production: falls back to Render backend URL
export const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export const apiUrl = (path: string) => `${API_BASE}${path}`;

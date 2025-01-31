const baseDomain = import.meta.env.PROD ? import.meta.env.VITE_BACKEND_URL : "http://localhost:8000";
export const baseURL = `${baseDomain}/api/v1`;
export const imageBaseURL = `${baseDomain}`;

export const productsPerPage = 10;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const API_ENDPOINTS = {
    COUNTRIES: `${API_BASE_URL}/countries`,
    LANGUAGES: `${API_BASE_URL}/languages`,
    SPONSORS: `${API_BASE_URL}/sponsors`,
    PHASES: `${API_BASE_URL}/phases`,
    DEVICES: `${API_BASE_URL}/devices`,
};

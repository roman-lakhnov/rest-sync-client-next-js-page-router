// utils/getHeaders.js
export const getHeaders = () => {
  try {
      return JSON.parse(process.env.HEADERS || '{}');
  } catch (error) {
      console.error('Failed to parse headers from .env file', error);
      return {};
  }
};

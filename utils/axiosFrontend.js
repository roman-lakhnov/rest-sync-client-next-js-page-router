import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', 
  validateStatus: false
});

export default axiosInstance;

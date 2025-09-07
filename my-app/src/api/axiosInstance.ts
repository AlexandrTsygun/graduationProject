import axios from 'axios';

const BASE_URL = 'https://api.spaceflightnewsapi.net/v4/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});
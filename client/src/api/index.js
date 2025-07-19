import axios from 'axios';
import { message } from "antd";

export const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // Rate limit error (429)
    if (status === 429) {
      message.error("Too many requests. Please try again later.");
    }

    return Promise.reject(error);
  }
);


import axios from "axios";

const baseAxios = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
});

baseAxios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken != null) {
      config.headers.access = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    console.log("axiosInstance request Error");
    return await Promise.reject(error);
  }
);

export default baseAxios;

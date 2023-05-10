import axios from "axios";
import { updateAccessToken } from "api/authAxios";

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

baseAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      console.log(error.response.status);
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken != null) {
        const refreshedAccessToken = await updateAccessToken(refreshToken);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (refreshedAccessToken) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          originalRequest.headers.access = `Bearer ${refreshedAccessToken}`;
          // localstorage에 저장
          localStorage.setItem("accessToken", refreshedAccessToken);
          return await baseAxios(originalRequest);
        }
      }
    }

    return await Promise.reject(error);
  }
);

export default baseAxios;

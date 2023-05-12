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
    console.log(error);

    /**
     * //TODO
     *  현재는 token_not_valid라는 예외처리로 refreshToken의 만료를 처리하고있지만 백엔드의
     * 에러코드를 업데이트하면 맞춰서 수정작업을 진행해야합니다.
     */

    if (
      error.response.status === 401 &&
      error.response.data.code !== "token_not_valid"
    ) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken != null) {
        const refreshedAccessToken = await updateAccessToken(refreshToken);

        if (
          refreshedAccessToken !== null &&
          refreshedAccessToken !== undefined
        ) {
          originalRequest.headers.access = `Bearer ${
            refreshedAccessToken as string
          }`;

          localStorage.setItem("accessToken", refreshedAccessToken);
          return await baseAxios(originalRequest);
        }
      }
    }
    localStorage.clear();
    alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요");
    originalRequest.history.push("/");

    return await Promise.reject(error);
  }
);

export default baseAxios;

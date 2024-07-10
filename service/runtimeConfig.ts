import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api/",
});

axiosClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      (error?.response?.status === 401 || error?.response?.status === 403) &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

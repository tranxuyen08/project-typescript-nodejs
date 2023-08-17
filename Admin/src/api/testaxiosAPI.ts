import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

//instance
const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor => bộ đón chặn
// Add a request interceptor
//làm điều gì đó trước khi request được gửi lên server
axiosClient.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function (config: InternalAxiosRequestConfig) {
    // Do something before request is sent
    return config;
    //lazy load
    //jwt
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
//làm điều gì đó sau khi response được trả về
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
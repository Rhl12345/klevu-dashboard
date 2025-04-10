import axios, { AxiosRequestConfig } from "axios";

// local api
const defaultBaseAPI = process.env.REACT_APP_PUBLIC_API_URL
  ? process.env.REACT_APP_PUBLIC_API_URL
  : "http://localhost:5001/api";

const axiosInstance = axios.create({
  baseURL: defaultBaseAPI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export const API = axios.create({
  baseURL: defaultBaseAPI,
});

export const AsyncFetch = <T>(request: AxiosRequestConfig): Promise<T> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request(request)
      .then(({ data, errors, success }: any) => {
        if (success) {
          resolve(data);
        } else {
          reject(errors);
          throw new Error(errors);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

axiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data && response.data.success) {
      return response.data;
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error && error?.message === "Network Error") {
      console.log("Network Error.");
    } else if (
      error &&
      error?.message === "Request failed with status code 401"
    ) {
      console.log("Session Expired, Please login again.");
    } else if (
      error &&
      error?.message === "Request failed with status code 405"
    ) {
      console.log("HTTP method not supported, Please contact to support team.");
    }

    return Promise.reject(error);
  }
);

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { getLogger } from "loglevel";
import { getSession } from "next-auth/react";

const log = getLogger("axios");
log.setLevel("error");

const onRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const session = await getSession();
  if (session && config.headers) {
    // @ts-ignore
    config.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }
  log.info("[request]", config);
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  log.error("[request error]", error);
  return Promise.reject(error);
};

const onResponse = <T>(
  response: AxiosResponse
): Promise<AxiosResponse["data"]> => {
  if (response.headers["Content-Type"] === "text/html") {
    return Promise.reject("GOT HTML RESPONSE");
  }

  log.info("[response]", response);
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  log.error("[response error] ", error);
  return Promise.reject(error);
};

function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

const defaultOptions = {
  baseURL: process.env.BASE_URL,
  timeout: 30 * 1000
};

const instance = axios.create(defaultOptions);
const http = setupInterceptorsTo(instance);

export default http;

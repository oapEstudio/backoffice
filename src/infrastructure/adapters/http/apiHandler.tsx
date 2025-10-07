import axios, { AxiosError } from "axios";

//import AuthService from "../../application/features/azure/auth.service";
import { env } from "../../config/env";
import type { IApiHandler, IHttpRequestConfig, IHttpResponse } from "../../../application/interfaces/IApiHandler.interface";
import { token } from "./mock/token_dev.mock";


// Construye el Basic a partir de variables de entorno
const user = import.meta.env.VITE_TEMP_BASIC_USER;     // “usr_backoffice”
const pass = import.meta.env.VITE_TEMP_BASIC_PASS;     // tu contraseña


axios.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    // si no hubo respuesta (timeout, network error)
    if (!error.response) {
      return Promise.reject(new Error("No se pudo conectar con el servidor. Verifica tu conexión."))
    }

    // mapeo según status
    const status = error.response.status
    let msg = "Error desconocido"

    if (status >= 500) {
      msg = "Ocurrió un error en el servidor. Intenta de nuevo más tarde."
    } else if (status === 404) {
      msg = "No se encontró el recurso solicitado."
    } else if (status === 401) {
      msg = "No estás autorizado. Por favor, inicia sesión."
    } else if (status === 400) {
      msg = "Los datos enviados son inválidos."
    }

    return Promise.reject(new Error(msg))
  }
);


axios.defaults.baseURL = env.baseURL;

const getConfig = (config: IHttpRequestConfig = {}) => {
  const { baseURL, queryParams, headers, ...rest } = config;
 

  if(env.authMode === 'mock')  return {
    params: queryParams,
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,     
    },
    ...(baseURL && { baseURL }),
    ...rest,
  };
  return {
    params: queryParams,
    headers: {
      ...headers      
    },
    ...(baseURL && { baseURL }),
    ...rest,
  };
};

export const apiHandler: IApiHandler = {
  get: async <T, D = undefined>(
    url: string,
    config?: IHttpRequestConfig,
    data?: D
  ): Promise<IHttpResponse<T, D>> => {
    const axiosResponse = await axios.get<T>(url, {
      data,
      ...getConfig(config),
    });
    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      request: data || ({} as D),
    };
  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: async <T = any, D = void>(
    url: string,
    config: IHttpRequestConfig = {},
    data?: D
  ): Promise<IHttpResponse<T, D>> => {
    const axiosResponse = await axios.post<T>(url, data, {
      ...getConfig(config),
    });

    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      request: data || ({} as D),
    };
  },

  put: async <T, D>(
    url: string,
    config: IHttpRequestConfig = {},
    data?: D
  ): Promise<IHttpResponse<T, D>> => {
    const axiosResponse = await axios.put(url, data, {
      ...getConfig(config),
    });

    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      request: data || ({} as D),
    };
  },

  delete: async <T, D>(
    url: string,
    config: IHttpRequestConfig = {},
    data?: D
  ): Promise<IHttpResponse<T, D>> => {
    const axiosResponse = await axios.delete(url, {
      data,
      ...getConfig(config),
    });

    return {
      data: axiosResponse.data,
      status: axiosResponse.status,
      headers: axiosResponse.headers,
      request: data || ({} as D),
    };
  },
};
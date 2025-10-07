export interface IHttpRequestConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams?: any;
  baseURL?: string;
  headers?: Record<string, string>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IHttpResponse<T = any, D = void> {
  data: T;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: Record<string | number, any>;
  request: D;
  isNetworkError?: boolean;
}

export interface IApiHandler {
  get: <T, D = undefined>(
    url: string,
    config?: IHttpRequestConfig,
    data?: D
  ) => Promise<IHttpResponse<T, D>>;
  post: <T, D = undefined>(
    url: string,
    config?: IHttpRequestConfig,
    data?: D
  ) => Promise<IHttpResponse<T, D>>;
  put: <T, D = any>(
    url: string,
    config?: IHttpRequestConfig,
    data?: D
  ) => Promise<IHttpResponse<T, D>>;
  delete: <T, D = undefined>(
    url: string,
    config?: IHttpRequestConfig,
    data?: D
  ) => Promise<IHttpResponse<T, D>>;
}
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const config = {
    baseUrl: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 60_000,
}

class AxiosClient {
    private instance: AxiosInstance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config);

        this.instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers.Authorization = `Bearer ${'test'}`;
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response: AxiosResponse) => {
                // Add any response interceptors here
                return response;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    get<T>(path: string, data?: object, others = {}): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(path, { data, ...others });
    }
    post<T>(path: string, data?: object, others = {}): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(path, {data, ...others });
    }
    put<T>(path: string, data?: object, others = {}): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(path, { data, ...others });
    }
    delete<T>(path: string, data?: object, others = {}): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(path, { data, ...others });
    }
    patch<T>(path: string, data?: object, others = {}): Promise<AxiosResponse<T>> {
        return this.instance.patch<T>(path, { data, ...others });
    }
}

export default new AxiosClient(config);
import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

interface UseAxiosResult<T> {
    response?: AxiosResponse<T>;
    error?: AxiosError;
    loading: boolean;
    sendData: () => void;
}

const useAxios = <T>(axiosParams: AxiosRequestConfig): UseAxiosResult<T> => {
    const [response, setResponse] = useState<AxiosResponse<T>>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(axiosParams.method === 'GET' || axiosParams.method === 'get');

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            const result = await axios.request<T>(params);
            setResponse(result);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const sendData = () => {
        fetchData(axiosParams);
    };

    useEffect(() => {
        if (axiosParams.method === 'GET' || axiosParams.method === 'get') {
            fetchData(axiosParams);
        }
    }, []);

    return { response, error, loading, sendData };
};

export default useAxios;
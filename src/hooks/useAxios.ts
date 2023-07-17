import {useState, useEffect} from 'react';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

type methodTypes = 'get' | 'post' | 'delete' | 'put' | 'patch';
const useAxios = () => {
    const [response, setResponse] = useState<any>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState<AbortController>();

    const axiosFetch = async ({axiosInstance, method, url, requestConfig = {}}: {
        axiosInstance: AxiosInstance,
        method: methodTypes,
        url: string,
        requestConfig?: AxiosRequestConfig
    }) => {
        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            setResponse(res.data);
        } catch (err: any) {
            console.log(err.message);
            setError(err.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        return () => {
            if (controller) {
                controller.abort()
            }
        };
    }, [controller]);

    return {response, error, loading, axiosFetch};
};

export default useAxios;
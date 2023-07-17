import {useState, useEffect} from 'react';
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

interface UseAxiosResult<T> {
    response?: AxiosResponse<T>;
    error?: AxiosError;
    loading: boolean;
    sendData: () => void;
}

const useAxios = (configObj) => {

    const {
        axiosInstance,
        method, url, requestConfig
    } = configObj;
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try{
                const res = await axiosInstance[method](url, {
                    ...requestConfig,
                    signal: controller.signal
                });
                setResponse(res.data);
            } catch (err) {
                console.log(err.message);
                setError(err.message)
            }
            finally {

            }
        }

        fetchData();

        return () => controller.abort();
    }, []);

    return {response, error, loading};
};

export default useAxios;
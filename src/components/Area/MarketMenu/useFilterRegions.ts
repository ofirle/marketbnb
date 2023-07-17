import {useEffect, useState} from "react";
import axios from './../../../apis/backend';
import useAxios from "../../../hooks/useAxios";

const useFilterRegion = () => {
    const {response: countriesOptions, error: errorCountries, loading: countryLoading, axiosFetch: countriesFetch} = useAxios();
    const {response: marketOptions, error: errorMarket, loading: marketLoading, axiosFetch: marketsFetch} = useAxios();
    const {response: subMarketOptions, error: errorSubMarket, loading: subMarketLoading, axiosFetch: subMarketsFetch} = useAxios();
    const [countrySelected, setCountrySelected] = useState<number | null>(null);
    const [marketSelected, setMarketSelected] = useState<number | null>(null);
    const [subMarketSelected, setSubMarketSelected] = useState<number | null>(null);

    const fetchCountriesOptions = async (): Promise<void> => {
        countriesFetch({
            axiosInstance: axios,
            method: "get",
            url: '/regions/filters/countries'
        });
    }
    const fetchMarketsOptions = async (countrySelected?: number): Promise<void> => {
        const requestConfig = countrySelected ? { params: {countryId: countrySelected} } : {}
        marketsFetch({
            axiosInstance: axios,
            method: "get",
            url: '/regions/filters/markets',
            requestConfig
        });
    }

    const fetchSubMarketsOptions = async (): Promise<void> => {
        subMarketsFetch({
            axiosInstance: axios,
            method: "get",
            url: '/regions/filters/sub_markets',
            requestConfig: {
                params: {
                    marketId: marketSelected,
                }
            }
        });
    }

    useEffect(() => {
        fetchCountriesOptions()
    }, [])

    useEffect(() => {
        // setSubMarketOptions([]);
        setMarketSelected(null);
        setSubMarketSelected(null);
        if (!countrySelected) {
            // setMarketOptions([]);
            return;
        }
        fetchMarketsOptions(countrySelected)
    }, [countrySelected])

    useEffect(() => {
        setSubMarketSelected(null);
        if (!marketSelected) {
            // setSubMarketOptions([]);
            return;
        }
        fetchSubMarketsOptions()
    }, [marketSelected])

    return {
        countriesOptions,
        marketOptions,
        subMarketOptions,
        countrySelected,
        marketSelected,
        subMarketSelected,
        setCountrySelected,
        setMarketSelected,
        setSubMarketSelected,
        countryLoading,
        marketLoading,
        subMarketLoading,
        fetchCountries: fetchCountriesOptions,
        fetchMarkets: fetchMarketsOptions

    }

}

export default useFilterRegion;
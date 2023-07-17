import {IWatchList} from "../MarketStatusBar/types";
import axios from "axios";
import {useEffect, useState} from "react";

export const useWatchLists = (regionId: number) => {
    const [watchLists, setWatchLists] = useState<IWatchList[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        fetchWatchLists();
    }, [regionId])
    const fetchWatchLists = async () => {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/regions/${regionId}/watch_lists`);
        setLoading(false);
        if(response.status === 200) {
            setWatchLists(response.data);
        } else {
            console.log(`failed to fetch watchLists for region id: ${regionId}`)
        }
    }

    return {
        data: watchLists,
        loading,
        fetchWatchLists,
    }

}
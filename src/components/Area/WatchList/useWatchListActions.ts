import {IWatchList} from "../MarketStatusBar/types";
import axios from "axios";

export const useWatchListActions = (id: number) => {
    console.log(id);
    const toggleVisibility = async ({ visible }: {
        visible: boolean
    }) => {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/watch_lists/${id}`, {visible});
        if(response.status === 200) {
            return { status: 'success' }
        } else {
            return { status: 'failed' }
        }
    }

    const archive = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/watch_lists/${id}`);
        return response.data;
    }

    return {
        toggleVisibility,
        archive,
    }

}
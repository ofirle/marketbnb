import useAxios from "../FetchData/useAxios";
import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, Polygon} from "@react-google-maps/api";
import axios, {AxiosRequestConfig} from "axios";

interface GoogleMapCustomProps {
    filters: {
        propertiesCount: number;
        prices: {
            min: number;
            max: number;
        };
    };
}
const  GoogleMapCustom = ({filters}: GoogleMapCustomProps) => {
    const [squares, setSquares] = useState<FullInfoSquare[]>([]);
    const [availabilityData, setAvailabilityData] = useState<SquareData[]>([]);
    const [squaresCoordinates, setSquaresCoordinates] = useState<SquareCoordinates[]>([]);
    interface SquareData {
        square_id: number;
        properties_count: number;
        occupancy: number;
        cost_per_night: number | null;
        url: string;
    }

    interface SquareCoordinates {
        center: {lat: number, lng: number};
        coordinates: {lat: number, lng: number}[];
        id: number
    }

    interface FullInfoSquare {
        square_id?: number;
        properties_count?: number;
        occupancy?: number;
        cost_per_night?: number | null;
        url?: string;
        center: {lat: number, lng: number};
        coordinates: {lat: number, lng: number}[];
        id: number
    }

    interface ResponseData {
        data: SquareData[];
    }
    // const { data, error, loaded } = useAxios<any>({
    //     url: "http://localhost:3000/coordinates/squaresCoordinates",
    //     method: "GET",
    // });
    // const { data: availabilityData, error: availabilityError } = useAxios<ResponseData>({
    //     url: "http://localhost:3000/coordinates/info",
    //     method: "GET",
    //     params: { ...{checkIn: '2023-05-25', checkOut: '2023-05-28', propertiesCount: filters.propertiesCount, minPrice: filters.prices.min, maxPrice: filters.prices.max} }, // Include the uniqueKey in the payload
    // });
    const axiosParams: AxiosRequestConfig = {
        method: 'GET',
        url: '/coordinates/info',
        params: {
            checkIn: '2023-05-25', checkOut: '2023-05-28', propertiesCount: filters.propertiesCount, minPrice: filters.prices.min, maxPrice: filters.prices.max}
    };
    // const { response, error: availabilityError, loading, sendData } = useAxios<any>(axiosParams);




    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('http://localhost:3000/coordinates/squaresCoordinates', { method: "get" });
            setSquaresCoordinates(request.data.data)

            console.log(request);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('http://localhost:3000/coordinates/info', { method: "get", params: {
                    checkIn: '2023-05-25', checkOut: '2023-05-28', propertiesCount: filters.propertiesCount, minPrice: filters.prices.min, maxPrice: filters.prices.max}
            });
            console.log(request.data.data, "datare")
            setAvailabilityData(request.data.data)
        }
        fetchData();
    }, [filters])


    useEffect(() => {
        // console.log(availabilityData, "availabilityData");
        if(!squaresCoordinates || !availabilityData) return;
        // console.log([squaresCoordinates, availabilityData], "data");
        const mergedArray: any[] = squaresCoordinates.map((firstObj: SquareCoordinates) => {
            const secondObj: any = availabilityData.find((secondObj:SquareData) => secondObj.square_id === firstObj.id);
            return { ...firstObj, ...secondObj };
        });
        // console.log(mergedArray, "MA");
        setSquares(mergedArray);
    }, [squaresCoordinates, availabilityData])

    const center = { lat: 37.956229176304426,
        lng: 23.70912982772603 }

    const options = {
        fillColor: "lightblue",
        fillOpacity: 0.4,
        strokeColor: "blue",
        strokeOpacity: 1,
        strokeWeight: 1,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }

    const onLoad = (polygon: any) => {
        console.log("polygon: ", polygon);
    }
    const mapContainerStyle = {
        width: '100%',
        height: '100vh',
    };

    const getOptions = (occupancyRate: number | null) => {
        const options = {
            fillColor: "blue",
            strokeColor: "gray",
            fillOpacity: 0.7,
            strokeOpacity: 0.4,
            strokeWeight: 1,
            clickable: true,
            draggable: false,
            editable: false,
            geodesic: false,
            zIndex: 1
        }
        const gradientColor = new Map<number, string>([
            [0, '#57bb8a'],
            [5, '#63b682'],
            [10, '#73b87e'],
            [15 , '#84bb7b'],
            [20 , '#94bd77'],
            [25 , '#a4c073'],
            [30 , '#b0be6e'],
            [35 , '#c4c56d'],
            [40 , '#d4c86a'],
            [45 , '#e2c965'],
            [50 , '#f5ce62'],
            [55 , '#f3c563'],
            [60 , '#e9b861'],
            [65 , '#e6ad61'],
            [70 , '#ecac67'],
            [75 , '#e9a268'],
            [80 , '#e79a69'],
            [85 , '#e5926b'],
            [90 , '#e2886c'],
            [95 , '#e0816d'],
            [100, '#dd776e']
        ]);
        const colorBordeaux = '#5F021F';
        const colorDarkRed = '#8B0000';
        const colorLightRed = '#FFCCCB';
        const colorOrange = '#FFA500';
        const colorYellow = '#FFFF00';
        const colorLightBlue = '#ADD8E6';
        const colorGray = '#808080';

        if(!occupancyRate) {
            options.fillColor = 'gray';
        }else {
            let color = 'gray';
            if(occupancyRate >= 95) color = colorBordeaux;
            else if(occupancyRate >= 90) color = colorDarkRed;
            else if(occupancyRate >= 85) color = colorLightRed;
            else if(occupancyRate >= 76) color = colorOrange;
            else if(occupancyRate >= 66) color = colorYellow;
            else if(occupancyRate >= 50) color = colorLightBlue;
            else color = colorGray;
            options.fillColor = color;
        }
        return options;
    }

    return (
        <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={center}
        >
            {squares.map((square: FullInfoSquare) => (<><Polygon
                paths={square.coordinates}
                options={getOptions(square?.occupancy || null)}
                onClick={() => window.open(square.url, '_blank')}
            />
                {/*<Marker position={square.center} label={(square.id).toString()}/>*/}
            </>))}
            {/*<Polygon*/}
            {/*    onLoad={onLoad}*/}
            {/*    paths={paths}*/}
            {/*    options={options}*/}
            {/*/>*/}
        </GoogleMap>
    );
}

export default GoogleMapCustom;
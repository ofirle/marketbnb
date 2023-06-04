import React, {useEffect, useState} from "react";
import {GoogleMap, Marker, Polygon} from "@react-google-maps/api";
import axios from "axios";
import {FullInfoSquare, SquareCoordinates, SquareData} from "./interfaces";

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
    const [centerMap, setCenterMap] = useState<{ lat: number, lng: number }>({ lat: 37.9742130138931, lng: 23.726449789715446 });
    const [availabilityData, setAvailabilityData] = useState<SquareData[]>([]);
    const [squaresCoordinates, setSquaresCoordinates] = useState<SquareCoordinates[]>([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('http://localhost:3000/coordinates/squaresCoordinates', { method: "get" });
            setSquaresCoordinates(request.data.data)
            setCenterMap(request.data.center);

            console.log(request);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get('http://localhost:3000/coordinates/info', { method: "get", params: {
                    checkIn: '2023-06-15', checkOut: '2023-06-18', propertiesCount: filters.propertiesCount, minPrice: filters.prices.min, maxPrice: filters.prices.max}
            });
            console.log(request.data.data, "datare")
            setAvailabilityData(request.data.data)
        }
        fetchData();
    }, [filters])


    useEffect(() => {
        if(!squaresCoordinates || !availabilityData) return;
        const mergedArray: any[] = squaresCoordinates.map((firstObj: SquareCoordinates) => {
            const secondObj: any = availabilityData.find((secondObj:SquareData) => secondObj.square_id === firstObj.id);
            return { ...firstObj, ...secondObj };
        });
        setSquares(mergedArray);
    }, [squaresCoordinates, availabilityData])

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
        const colorBordeaux = '#5F021F';
        const colorDarkRed = '#8B0000';
        const colorLightRed = '#FFCCCB';
        const colorOrange = '#FFA500';
        const colorYellow = '#FFFF00';
        const colorLightBlue = '#ADD8E6';
        const colorGray = '#808080';

        if(!occupancyRate) {
            options.fillColor = 'black';
        } else {
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
            zoom={14}
            center={centerMap}
        >
            {squares.map((square: FullInfoSquare) => (<><Polygon
                paths={square.coordinates}
                options={getOptions(square?.occupancy || null)}
                onClick={() => window.open(square.url, '_blank')}
            />
                {/*<Marker position={square.center} label={(square.id).toString()}/>*/}
            </>))}
        </GoogleMap>
    );
}

export default GoogleMapCustom;

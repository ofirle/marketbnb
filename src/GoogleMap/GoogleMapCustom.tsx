import React, {useEffect, useState} from "react";
import {Autocomplete, GoogleMap, InfoBox, LoadScript, InfoWindow, Marker, Polygon} from "@react-google-maps/api";
import axios from "axios";
import {FullInfoSquare, SquareCoordinates, SquareData} from "./interfaces";
import PolygonComponent from "./PolygonComponent";
import {InfoBoxOptions} from "@react-google-maps/infobox";
import InfoBoxContent from "./InfoBoxComponent/InfoBoxContent/InfoBoxContent";

interface GoogleMapCustomProps {
    filters: {
        propertiesCount: number;
        prices: {
            min: number;
            max: number;
        };
    },
    squareClicked: (square: any) => void;
}

const divStyle = {
    background: `white`,
    width: 250,
    // border: `1px solid #ccc`,
    padding: 10
}

const onLoad = (infoBox: any) => {
    console.log('infoBox: ', infoBox)
};


const GoogleMapCustom = ({filters, squareClicked}: GoogleMapCustomProps) => {
    const DEFAULT_CENTER_MAP: { lat: number, lng: number } = {
        lat: 37.9742130138931,
        lng: 23.726449789715446
    };
    const [squares, setSquares] = useState<FullInfoSquare[]>([]);
    const [centerMap, setCenterMap] = useState<{ lat: number, lng: number }>(DEFAULT_CENTER_MAP);
    const [availabilityData, setAvailabilityData] = useState<SquareData[]>([]);
    const [squaresCoordinates, setSquaresCoordinates] = useState<SquareCoordinates[]>([]);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [hoverSquare, setHoverSquare] = useState<FullInfoSquare | null>(null);


    useEffect(() => {
        console.log("GoogleMapCustom Loaded")

        async function fetchData() {
            const request = await axios.get('http://localhost:3000/coordinates/squaresCoordinates', {method: "get"});
            setSquaresCoordinates(request.data.data)
            setCenterMap(request.data.center);

            console.log(request);
        }

        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            // if(filters.propertiesCount)
            const request = await axios.get('http://localhost:3000/coordinates/info', { method: "get", params: {
                    checkIn: '2023-06-22', checkOut: '2023-06-25', propertiesCount: filters.propertiesCount, minPrice: filters.prices.min, maxPrice: filters.prices.max}
            });
            console.log(request.data.data, "datare")
            setAvailabilityData(request.data.data)
        }

        fetchData();
    }, [filters])


    useEffect(() => {
        if (!squaresCoordinates || !availabilityData) return;
        const mergedArray: any[] = squaresCoordinates.map((firstObj: SquareCoordinates) => {
            const secondObj: any = availabilityData.find((secondObj: SquareData) => secondObj.square_id === firstObj.id);
            return {...firstObj, ...secondObj};
        });
        setSquares(mergedArray);
    }, [squaresCoordinates, availabilityData])

    const options: InfoBoxOptions = {
        position: new google.maps.LatLng(hoverSquare?.center || DEFAULT_CENTER_MAP),
        visible: showInfo,
        alignBottom: true,
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

    const onLoad = (autocomplete: any) => {
        console.log('autocomplete: ', autocomplete)

        // this.autocomplete = autocomplete
    }

    const onPlaceChanged = () => {
        // if (this.autocomplete !== null) {
        //     console.log(this.autocomplete.getPlace())
        // } else {
        //     console.log('Autocomplete is not loaded yet!')
        // }
    }

    return (
        <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={centerMap}
            key={'marker-example'}
        >
            <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Customized your placeholder"
                    style={{
                        boxSizing: `border-box`,
                        border: `1px solid transparent`,
                        width: `240px`,
                        height: `32px`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                        position: "absolute",
                        left: "50%",
                        marginLeft: "-120px"
                    }}
                />
            </Autocomplete>
            <InfoBox
                onLoad={onLoad}
                options={options}
            >
                <div style={divStyle}>
                    <h3>Square Id: {hoverSquare?.id}</h3>
                    <InfoBoxContent square={hoverSquare}/>
                </div>
            </InfoBox>
            {squares.map((square: FullInfoSquare) => (
                <PolygonComponent square={square} onChangeShowInfo={(value: boolean) => setShowInfo(value)}
                                  setHoverSquare={((squareHover: FullInfoSquare) => setHoverSquare(squareHover))} squareClicked={(square) => squareClicked(square)}/>))}
            {/*<Marker position={square.center} label={(square.id).toString()}/>*/}
        </GoogleMap>
    );
}

export default GoogleMapCustom;

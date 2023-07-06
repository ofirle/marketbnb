import React, {useEffect, useState} from "react";
import {
    Autocomplete,
    GoogleMap,
    InfoBox,
    LoadScript,
    InfoWindow,
    Marker,
    Polygon,
    DrawingManager
} from "@react-google-maps/api";
import axios from "axios";
import {FullInfoSquare, SquareCoordinates, SquareData} from "./interfaces";
import PolygonComponent from "./PolygonComponent";
import {InfoBoxOptions} from "@react-google-maps/infobox";
import InfoBoxContent from "./InfoBoxComponent/InfoBoxContent/InfoBoxContent";
import * as turf from '@turf/turf';
import {Position} from "@turf/turf";

interface GoogleMapCustomProps {
    filters: {
        propertiesCount: number;
        prices: {
            min: number;
            max: number;
        };
    },
    squareClicked: (square: any) => void;
    drawingMode: boolean
    onDrawingCompleted: (squares: any[]) => void;
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

const regionId = 1;
const GoogleMapCustom = ({filters, squareClicked, drawingMode, onDrawingCompleted}: GoogleMapCustomProps) => {
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
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/regions/${regionId}/squares`, {method: "get"});
            setSquaresCoordinates(request.data.data)
            setCenterMap(request.data.center);

            console.log(request);
        }

        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            // if(filters.propertiesCount)
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/regions/${regionId}/squares/info`, {
                method: "get", params: {
                    checkIn: '2023-06-22',
                    checkOut: '2023-06-25',
                    propertiesCount: filters.propertiesCount,
                    minPrice: filters.prices.min,
                    maxPrice: filters.prices.max
                }
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
        console.log({mergedArray});
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

        if (!occupancyRate) {
            options.fillColor = 'black';
        } else {
            let color = 'gray';
            if (occupancyRate >= 95) color = colorBordeaux;
            else if (occupancyRate >= 90) color = colorDarkRed;
            else if (occupancyRate >= 85) color = colorLightRed;
            else if (occupancyRate >= 76) color = colorOrange;
            else if (occupancyRate >= 66) color = colorYellow;
            else if (occupancyRate >= 50) color = colorLightBlue;
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

    const onPolygonComplete = (polygon2: any) => {
        const function2 = (points: Position[]) => {

            const squares = []
            // console.log(points);

            const polygon = turf.polygon([points]);
            // var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });

            const boundingBox = turf.bbox(polygon);
            const squareSizeX = 0.00117055221626;
            const squareSizeY = 0.001460557432437;

            // lng: 0.001460557432437, lat: 0.00117055221626 }
// Calculate the number of squares that fit in the bounding box.
            console.log((boundingBox[2] - boundingBox[0]) / squareSizeX, "X SQUARES")
            console.log((boundingBox[3] - boundingBox[1]) / squareSizeY, "Y SQUARES")
            const squaresY = Math.ceil((boundingBox[2] - boundingBox[0]) / squareSizeX);
            const squaresX = Math.ceil((boundingBox[3] - boundingBox[1]) / squareSizeY);
// For each potential square...
            for (let x = 0; x <= squaresY; x++) {
                for (let y = 0; y <= squaresX; y++) {
                    // Calculate the square's coordinates.
                    const squareCoordinates = [
                        boundingBox[0] + x * squareSizeX,
                        boundingBox[1] + y * squareSizeY
                    ];

                    // Create a point from the square's coordinates.
                    const squarePoint = turf.point(squareCoordinates);
                    const squaresPoint = [
                        turf.point([squareCoordinates[0], squareCoordinates[1]]),
                        turf.point([squareCoordinates[0], squareCoordinates[1] + squareSizeY]),
                        turf.point([squareCoordinates[0] + squareSizeX, squareCoordinates[1]  + squareSizeY]),
                        turf.point([squareCoordinates[0] + squareSizeX, squareCoordinates[1]]),
                    ]

                    // If the point is inside the polygon...
                    // console.log(polygon, "polygon");
                    const inSquare = squaresPoint.some((item => turf.booleanPointInPolygon(item, polygon)))
                    if (inSquare) {
                        console.log(squaresPoint, "squaresPoint");
                        const square = [
                            {lat: squareCoordinates[0], lng: squareCoordinates[1]},
                            {lat: squareCoordinates[0], lng: squareCoordinates[1] + squareSizeY},
                            {lat: squareCoordinates[0] + squareSizeX, lng: squareCoordinates[1]  + squareSizeY},
                            {lat: squareCoordinates[0] + squareSizeX, lng: squareCoordinates[1]}
                        ]
                        // console.log(square, "squarePoint");
                        squares.push({
                            center: {lat: 0, lng: 0},
                            coordinates: square,
                            id: 1
                        })
                        // Draw or store the square.
                        // Note that you might want to draw/store the full square, not just its center point.
                        // This can be done by calculating the coordinates of the square's four corners.
                    }
                }
            }
                return squares;
        }

        console.log(polygon2, "POLOGON")
        const positions = polygon2.latLngs.g[0].g.map((item: any) => [item.lat(), item.lng()])
        const firstPoint = positions[0]
        const squares = function2([...positions, firstPoint]);
        onDrawingCompleted(squares);
        // const squareSize = 1; // or whatever size you want
    }
    return (
        <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}

            zoom={14}
            center={centerMap}
            key={'marker-example'}
            onClick={(e: any) => {
                console.log(e.latLng.lat())
                console.log({lat: e.lat, lng: e.lng})
                // onPolygonComplete("Test");
            }}
        >
            {/*<Autocomplete*/}
            {/*    onLoad={onLoad}*/}
            {/*    onPlaceChanged={onPlaceChanged}*/}
            {/*>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        placeholder="Customized your placeholder"*/}
            {/*        style={{*/}
            {/*            boxSizing: `border-box`,*/}
            {/*            border: `1px solid transparent`,*/}
            {/*            width: `240px`,*/}
            {/*            height: `32px`,*/}
            {/*            padding: `0 12px`,*/}
            {/*            borderRadius: `3px`,*/}
            {/*            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,*/}
            {/*            fontSize: `14px`,*/}
            {/*            outline: `none`,*/}
            {/*            textOverflow: `ellipses`,*/}
            {/*            position: "absolute",*/}
            {/*            left: "50%",*/}
            {/*            marginLeft: "-120px"*/}
            {/*        }}*/}
            {/*    />*/}
            {/*</Autocomplete>*/}
            {drawingMode && <DrawingManager
                drawingMode={ google.maps.drawing.OverlayType.POLYGON}
                onLoad={onLoad}
                onPolygonComplete={onPolygonComplete}
            />}
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
                                  setHoverSquare={((squareHover: FullInfoSquare) => setHoverSquare(squareHover))}
                                  squareClicked={(square) => squareClicked(square)}/>))}
            {/*<Marker position={square.center} label={(square.id).toString()}/>*/}
        </GoogleMap>
    );
}

export default GoogleMapCustom;

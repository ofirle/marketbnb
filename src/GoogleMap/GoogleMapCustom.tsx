import React, {useEffect, useState} from "react";
import {
    GoogleMap,
    InfoBox,
    DrawingManager, Marker
} from "@react-google-maps/api";
import axios from "axios";
import {FullInfoSquare, SquareCoordinates, SquareData} from "./interfaces";
import PolygonComponent from "./PolygonComponent";
import {InfoBoxOptions} from "@react-google-maps/infobox";
import InfoBoxContent from "./InfoBoxComponent/InfoBoxContent/InfoBoxContent";
import {Position} from "@turf/turf";
import {IRegion, IWatchList, PointCoordinate} from "../components/Area/MarketStatusBar/types";
import useAxios from "../hooks/useAxios";
import {useWatchLists} from "../components/Area/WatchList/useWatchLists";

interface GoogleMapCustomProps {
    filters: {
        propertiesCount: number;
        prices: {
            min: number;
            max: number;
        };
    },
    region: IRegion;
    squareClicked: (square: any) => void;
    drawingMode: boolean
    onDrawingCompleted: (squares: any[]) => void;
    center?: PointCoordinate;
    zoom: number;
    watchLists: IWatchList[]
}

const divStyle = {
    background: `white`,
    width: 250,
    padding: 10
}
const GoogleMapCustom = ({filters, squareClicked, drawingMode, onDrawingCompleted, region, center, zoom, watchLists}: GoogleMapCustomProps) => {
    const DEFAULT_CENTER_MAP: { lat: number, lng: number } = {
        lat: 37.9742130138931,
        lng: 23.726449789715446
    };
    const {
        response: squaresInfoData,
        error: errorSquaresInfo,
        loading: squaresInfoLoading,
        axiosFetch: squaresInfoFetch
    } = useAxios();
    const {
        response: squaresAvailabilityData,
        error: errorSquaresAvailability,
        loading: squaresAvailabilityLoading,
        axiosFetch: squaresAvailabilityFetch
    } = useAxios();
    const [squaresInfo, setSquaresInfo] = useState([]);
    const [squaresAvailability, setSquaresAvailability] = useState([]);
    const [squares, setSquares] = useState<FullInfoSquare[]>([]);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [hoverSquare, setHoverSquare] = useState<FullInfoSquare | null>(null);


    useEffect(() => {
        squaresInfoFetch({
            axiosInstance: axios,
            url: `/regions/${region.id}/squares`,
            method: "get",
        })
    }, [region.id])

    useEffect(() => {
        squaresAvailabilityFetch({
            axiosInstance: axios,
            url: `/regions/${region.id}/squares/info`,
            method: "get",
            requestConfig: {
                params: {
                    checkIn: '2023-07-28',
                    checkOut: '2023-07-30',
                    propertiesCount: filters.propertiesCount,
                    minPrice: filters.prices.min,
                    maxPrice: filters.prices.max
                }
            }
        })
    }, [filters, region.id])

    useEffect(() => {
        if(!squaresInfoData) return;
        setSquaresInfo(squaresInfoData.data);
    }, [squaresInfoData])
    useEffect(() => {
        if(!squaresAvailabilityData) return;
        setSquaresAvailability(squaresAvailabilityData.data);
    }, [squaresAvailabilityData])


    const updateSquaresPolygon = async (points: Position[]) => {
        const request = await axios.post(`${process.env.REACT_APP_API_URL}/regions/${region.id}/squares`, {
            points
        });
        // setSquaresCoordinates(request.data.squares);
    }


    useEffect(() => {
        console.log(squaresInfo, "squaresInfo");
        console.log(squaresAvailability, "squaresAvailability");
        if (!squaresInfo || !squaresAvailability) return;
        const mergedArray: any[] = squaresInfo.map((firstObj: SquareCoordinates) => {
            const secondObj: any = squaresAvailability.find((secondObj: SquareData) => secondObj.square_id === firstObj.id);
            return {...firstObj, ...secondObj};
        });
        setSquares(mergedArray);
    }, [squaresInfo, squaresAvailability])

    const options: InfoBoxOptions = {
        position: new google.maps.LatLng(DEFAULT_CENTER_MAP),
        visible: showInfo,
        alignBottom: true,
    }

    const mapContainerStyle = {
        width: '100%',
        height: '100vh',
    };

    const onLoad = (autocomplete: any) => {
        console.log('autocomplete: ', autocomplete)
    }
    const onPolygonComplete = (polygon: any) => {
        const positions = polygon.latLngs.g[0].g.map((item: any) => [item.lat(), item.lng()])
        const firstPoint = positions[0]
        updateSquaresPolygon([...positions, firstPoint]);
    }
    return (
        <GoogleMap
            id="marker-example"
            mapContainerStyle={mapContainerStyle}

            zoom={zoom}
            center={center || region.center}
            key={'marker-example'}
            onClick={(e: any) => {
                console.log(e.latLng.lat())
                console.log({lat: e.lat, lng: e.lng})
            }}
        >
            {drawingMode && <DrawingManager
                drawingMode={google.maps.drawing.OverlayType.POLYGON}
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
            {watchLists.filter((item) => item.visible && !item.archived).map((item) => {
                return <Marker position={{lat: item.lat, lng: item.lng}} label={item.title}/>
            })}
            {/*<Marker position={square.center} label={(square.id).toString()}/>*/}
        </GoogleMap>
    );
}

export default GoogleMapCustom;

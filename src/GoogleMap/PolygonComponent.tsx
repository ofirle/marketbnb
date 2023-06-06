import {FullInfoSquare} from "./interfaces";
import {Polygon} from "@react-google-maps/api";
import React, {useState} from "react";
import {Popover} from "antd";

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


const PolygonComponent = ({square, onChangeShowInfo, setHoverSquare}: { square: FullInfoSquare, onChangeShowInfo: (value: boolean) => void; setHoverSquare: (square: FullInfoSquare) => void }) => {
    const [open, setOpen] = useState(false);

    const hide = () => {
        setOpen(false);
    };

    const handleOpenChange = (newOpen: boolean) => {
        console.log(newOpen);
        setOpen(newOpen);
    };
    return (<Polygon
        key={square.id}
        paths={square.coordinates}
        options={getOptions(square?.occupancy || null)}
        onClick={() => window.open(square.url, '_blank')}
        onMouseOver={() => {
            onChangeShowInfo(true);
            setHoverSquare(square);
        }}
        onMouseOut={() => onChangeShowInfo(false)}

        // onMouseOut={() => hide()}
    />)
}
export default PolygonComponent;

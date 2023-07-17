import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, ConfigProvider, Drawer, Row, Space} from "antd";
import {useLoadScript} from "@react-google-maps/api";

import GoogleMapCustom from "./GoogleMap/GoogleMapCustom";
import ModalComponent from "./components/Modal/ModalComponent";
import SquarePage from "./pages/SquarePage";
import {FullInfoSquare} from "./GoogleMap/interfaces";
import MarketMenu from "./components/Area/MarketMenu/MarketMenu";
import WatchList from "./components/Area/WatchList/WatchList";
import MarketStatusBar from "./components/Area/MarketStatusBar/MarketStatusBar";
import {IRegion, PointCoordinate} from "./components/Area/MarketStatusBar/types";
import {useWatchLists} from "./components/Area/WatchList/useWatchLists";
import watchList from "./components/Area/WatchList/WatchList";

const App = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
        libraries: ['places', 'drawing']
    })
    const [region, setRegion] = useState<IRegion>({
        id: 1,
        marketId: 1,
        subMarketId: 1,
        priority: 3,
        market: {
            id: 1,
            countryId: 1,
            label: "Athens",
            icon_url: null,
            country: {
                id: 1,
                key: "GE",
                label: "Greece",
                icon_url: null,
                markets: [
                    {
                        id: 1,
                        countryId: 1,
                        label: "Athens",
                        icon_url: null
                    }
                ]
            }
        },
        subMarket: {
            id: 1,
            marketId: 1,
            label: "Koukaki",
            icon_url: null
        },
        center: {
            lat: 37.9742130138931,
            lng: 23.726449789715446
        },
        watchLists: [
            {
                id: 1,
                title: 'Filopappou 11, Athens',
                lat: 37.96471629643627,
                lng: 23.720536896346335,
                archived: false,
                visible: true
            }
        ]
    });
    const {data, fetchWatchLists, loading} = useWatchLists(region.id);

    const [prices, setPrices] = useState({min: 0, max: 1300})
    const [propertiesCount, setPropertiesCount] = useState(0);
    const [createAreaModalOpen, setCreateAreaModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [drawingMode, setDrawingMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [clickedSquare, setSquare] = useState<FullInfoSquare | null>(null);

    const [zoomMap, setZoomMap] = useState<number>(15)
    const [centerMap, setCenterMap] = useState<PointCoordinate | undefined>(undefined)


    useEffect(() => {
        setCenterMap(region.center);
        setZoomMap(15);
    }, [region])

    const setClickedSquare = (square: any) => {
        setSquare(square);
        setOpen(true);
    }

    const onDrawingCompleted = (squares: any[]) => {
        setCreateAreaModalOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    };

    const refetch = () => {
        fetchWatchLists();
    }

    return (<ConfigProvider
            theme={{
                token: {
                    colorText: '#40444e',
                    fontFamily: 'Roboto'
                },
            }}
        >
            <MarketMenu onRegionChanged={setRegion}/>
            <WatchList data={data} setCenterMap={setCenterMap} setZoomMap={setZoomMap} refetch={refetch}/>
            <MarketStatusBar region={region} totalSquares={1234}/>
            <ModalComponent open={modalOpen} onClose={() => setModalOpen(false)}/>
            {/*<CreateArea open={createAreaModalOpen} onClose={() => setCreateAreaModalOpen(false)}/>*/}
            <Row style={{padding: 16}}>
                <Space direction={'horizontal'}>
                    <Button onClick={() => setModalOpen(true)} shape={'round'}>Filters</Button>
                    <Button onClick={() => setDrawingMode(true)} shape={'round'}>Draw Search Area</Button>
                    <Button onClick={() => setCreateAreaModalOpen(true)} shape={'round'}>Open Search Area</Button>
                </Space>
            </Row>
            <Row>
                {isLoaded && <GoogleMapCustom filters={{propertiesCount: propertiesCount, prices: prices}}
                                              squareClicked={(square) => setClickedSquare(square)}
                                              drawingMode={drawingMode} onDrawingCompleted={onDrawingCompleted}
                                              region={region} center={centerMap} zoom={zoomMap} watchLists={data}/>}
            </Row>
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}
                    className={'square-drawer'}>
                <SquarePage id={clickedSquare ? clickedSquare.id : null} closeDrawer={onClose}/>
            </Drawer>
        </ConfigProvider>
    )
}

export default App;
import React, {useState} from 'react';
import './App.css';
import {Button, Col, Divider, Drawer, Row, Space, Switch, Typography} from "antd";
import {useLoadScript} from "@react-google-maps/api";

import GoogleMapCustom from "./GoogleMap/GoogleMapCustom";
import ModalComponent from "./components/Modal/ModalComponent";
import DescriptionsItem from "antd/es/descriptions/Item";
import {SquareData} from "./interfaces/squarePage";
import SquarePage from "./pages/SquarePage";
import {FullInfoSquare} from "./GoogleMap/interfaces";
import CreateArea from "./components/Area/CreateArea";
import MarketMenu from "./components/Area/MarketMenu/MarketMenu";
import WatchList from "./components/Area/WatchList/WatchList";
import MarketStatusBar from "./components/Area/MarketStatusBar/MarketStatusBar";

const App = () => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string,
        libraries: ['places', 'drawing']
    })
    const [prices, setPrices] = useState({min: 0, max: 1300})
    const [propertiesCount, setPropertiesCount] = useState(0);
    const [createAreaModalOpen, setCreateAreaModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [drawingMode, setDrawingMode] = useState(false);
    const [open, setOpen] = useState(false);
    const [clickedSquare, setSquare] = useState<FullInfoSquare | null>(null);

    const setClickedSquare = (square: any) => {
        setSquare(square);
        setOpen(true);
    }

    const onDrawingCompleted = (squares: any[]) => {
        setCreateAreaModalOpen(true);
    }
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    interface DescriptionItemProps {
        title: string;
        content: React.ReactNode;
    }

    return (<>
            <MarketMenu />
            <WatchList />
            <MarketStatusBar country={'Greece'} market={'Athens'} subMarket={'Koukaki'} totalSquares={1109} priority={1} selectionId={1}/>
            <ModalComponent open={modalOpen} onClose={() => setModalOpen(false)}/>
            <CreateArea open={createAreaModalOpen} onClose={() => setCreateAreaModalOpen(false)}/>
            <Row style={{padding: 16}}>
                <Space direction={'horizontal'}>
                    {/*<Col span={24}>*/}
                    <Button onClick={() => setModalOpen(true)} shape={'round'}>Filters</Button>
                    <Button onClick={() => setDrawingMode(!drawingMode)} shape={'round'}>Draw Search Area</Button>
                    <Button onClick={() => setCreateAreaModalOpen(true)} shape={'round'}>Open Search Area</Button>
                    {/*</Col>*/}
                </Space>
            </Row>
            <Row>
                {isLoaded && <GoogleMapCustom filters={{propertiesCount: propertiesCount, prices: prices}}
                                              squareClicked={(square) => setClickedSquare(square)}
                                              drawingMode={drawingMode} onDrawingCompleted={onDrawingCompleted}/>}
            </Row>
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}
                    className={'square-drawer'}>
                <SquarePage id={clickedSquare ? clickedSquare.id : null} closeDrawer={onClose}/>
            </Drawer>
        </>
    )
}

export default App;
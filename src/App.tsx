import React, {useState} from 'react';
import './App.css';
import {Button, Col, Divider, Drawer, Row, Switch, Typography} from "antd";
import {useLoadScript} from "@react-google-maps/api";

import GoogleMapCustom from "./GoogleMap/GoogleMapCustom";
import ModalComponent from "./components/Modal/ModalComponent";
import DescriptionsItem from "antd/es/descriptions/Item";
import {SquareData} from "./interfaces/squarePage";
import SquarePage from "./pages/SquarePage";
import {FullInfoSquare} from "./GoogleMap/interfaces";

const App = () => {
    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY as string, libraries: ['places'] })
    const [prices, setPrices] = useState({min: 0, max: 1300})
    const [propertiesCount, setPropertiesCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [clickedSquare, setSquare] = useState<FullInfoSquare | null>(null);

    const setClickedSquare = (square: any) => {
        setSquare(square);
        setOpen(true);
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
            <ModalComponent open={modalOpen} onClose={() => setModalOpen(false)}/>
            <Row style={{padding: 16}}>
                <Col span={24}>
                    <Button onClick={() => setModalOpen(true)}>Filters</Button>
                </Col>
            </Row>
            <Row>
                {isLoaded && <GoogleMapCustom filters={{propertiesCount: propertiesCount, prices: prices}} squareClicked={(square) => setClickedSquare(square)}/>}
            </Row>
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open} className={'square-drawer'}>
                <SquarePage id={clickedSquare ? clickedSquare.id : null} closeDrawer={onClose}/>
            </Drawer>
        </>
    )
}

export default App;
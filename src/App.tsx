import React, {useState} from 'react';
import './App.css';
import {Button, Col, Divider, Drawer, Row, Switch} from "antd";
import {useLoadScript} from "@react-google-maps/api";

import GoogleMapCustom from "./GoogleMap/GoogleMapCustom";
import ModalComponent from "./components/Modal/ModalComponent";
import DescriptionsItem from "antd/es/descriptions/Item";

const App = () => {
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyAt-fPyvxpKWhAZJCQ_fo86d_REWkyfOZ4", libraries: ['places'] })
    const [prices, setPrices] = useState({min: 0, max: 1300});
    const [propertiesCount, setPropertiesCount] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [clickedSquare, setSquare] = useState(null);

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

    const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
        <div className="site-description-item-profile-wrapper">
            <p className="site-description-item-profile-p-label">{title}:</p>
            {content}
        </div>
    );
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
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content="Lily" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Account" content="AntDesign@example.com" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="City" content="HangZhou" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Country" content="China🇨🇳" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Birthday" content="February 2,1900" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Website" content="-" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Message"
                            content="Make things as simple as possible but no simpler."
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Company</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Position" content="Programmer" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Responsibilities" content="Coding" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Department" content="XTech" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Skills"
                            content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Email" content="AntDesign@example.com" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Github"
                            content={
                                <a href="http://github.com/ant-design/ant-design/">
                                    github.com/ant-design/ant-design/
                                </a>
                            }
                        />
                    </Col>
                </Row>
            </Drawer>
        </>
    )
}

export default App;
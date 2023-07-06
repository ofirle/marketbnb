import React from 'react';
import {Button, Col, Row, Select, Space, Typography} from "antd";
import styles from './WatchList.module.css'
import {
    DeleteFilled, DeleteOutlined,
    EyeFilled, EyeInvisibleFilled, EyeOutlined,
    LeftCircleFilled,
    PlusCircleFilled,
    PushpinFilled,
    RightCircleFilled
} from "@ant-design/icons";

const WatchListItem = ({title, visible, latLng, onDelete}: {
    title: string;
    visible: boolean;
    latLng?: { lat: number, lng: number };
    onDelete?: () => void
}) => {
    const visibleIcon = visible ? <EyeFilled style={{cursor: "pointer"}}/> :
        <EyeInvisibleFilled style={{color: '#8c8c8c', cursor: "pointer"}}/>
    return (
        <Row>
            <Col span={2}>
                <PushpinFilled style={{color: '#FF8000'}}/>
            </Col>
            <Col span={19}>
                <Typography.Text>{title}</Typography.Text>
            </Col>
            <Col span={3}>
                <Space>
                    {visibleIcon}
                    <DeleteFilled style={{color: '#8c8c8c', cursor: "pointer"}}/>
                </Space>
            </Col>
        </Row>
    );
}

export default WatchListItem;




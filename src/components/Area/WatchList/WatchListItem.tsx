import React, {useEffect, useState} from 'react';
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
import {IWatchList, PointCoordinate} from "../MarketStatusBar/types";
import {useWatchListActions} from "./useWatchListActions";

const WatchListItem = ({id, title, visible, latLng, onDelete, setCenterMap, setZoomMap, onWatchListItemUpdated}: {
    id: number
    title: string;
    visible: boolean;
    latLng: PointCoordinate;
    onDelete?: () => void,
    setCenterMap: (point: PointCoordinate) => void
    setZoomMap: (zoom: number) => void
    onWatchListItemUpdated: () => void
}) => {
    const {toggleVisibility, archive} = useWatchListActions(id);

    const visibleIcon = visible ? <EyeFilled style={{cursor: "pointer"}} onClick={async () => {
            const response = await toggleVisibility({visible: !visible});
            if (response.status === 'success') {
                onWatchListItemUpdated();
            }
        }}/> :
        <EyeInvisibleFilled style={{color: '#8c8c8c', cursor: "pointer"}}
                            onClick={async () => {
                                const response = await toggleVisibility({visible: !visible});
                                if (response.status === 'success') {
                                    onWatchListItemUpdated();
                                }
                            }}/>

    const onItemClicked = () => {
        setCenterMap(latLng);
        setZoomMap(17)
    }
    return (
        <Row key={id}>
            <Col span={2}>
                <PushpinFilled style={{color: '#FF8000', cursor: "pointer"}} onClick={onItemClicked}/>
            </Col>
            <Col span={19}>
                <Typography.Text>{title}</Typography.Text>
            </Col>
            <Col span={3}>
                <Space>
                    {visibleIcon}
                    <DeleteFilled style={{color: '#8c8c8c', cursor: "pointer"}} onClick={archive}/>
                </Space>
            </Col>
        </Row>
    );
}

export default WatchListItem;




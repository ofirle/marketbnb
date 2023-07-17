import React from 'react';
import {Button, Col, Row, Select, Space, Spin, Typography} from "antd";
import styles from './WatchList.module.css'
import {LeftCircleFilled, PlusCircleFilled, RightCircleFilled} from "@ant-design/icons";
import WatchListItem from "./WatchListItem";
import CustomButton from "../../UI/Button/CustomButton";
import {IWatchList, PointCoordinate} from "../MarketStatusBar/types";
import useAxios from "../../../hooks/useAxios";
import {Position} from "@turf/turf";
import axios from "axios";
import {useWatchLists} from "./useWatchLists";

const WatchList = ({data, setCenterMap, setZoomMap, refetch}: {
    // regionId: number,
    data: IWatchList[],
    setCenterMap: (point: PointCoordinate) => void,
    setZoomMap: (zoom: number) => void,
    refetch: () => void
}) => {
    // const {data, fetchWatchLists, loading} = useWatchLists(regionId);
    // const onWatchListItemUpdated = () => {
    //     fetchWatchLists();
    // }
    return (<div className={styles.marketMenuLayout}>
        <Row justify="space-between">
            <Col>
                <Typography.Text className={styles.marketMenuTitle}>Watch List</Typography.Text>
            </Col>
            <Col>
                <LeftCircleFilled style={{fontSize: 24, cursor: "pointer"}}/>
            </Col>
        </Row>
        <Row style={{marginTop: 16}}>
            <Col span={24}>
                <Space direction={'vertical'} style={{width: '100%'}} size={"small"}>
                    {data.map((watchList) => {
                        return <WatchListItem title={watchList.title} visible={watchList.visible}
                                              latLng={{lat: watchList.lat, lng: watchList.lng}} id={watchList.id}
                                              setCenterMap={setCenterMap} setZoomMap={setZoomMap}
                                              onWatchListItemUpdated={refetch}/>

                    })
                    }
                </Space>
            </Col>
        </Row>
        <Row style={{marginTop: 24}}>
            <Col span={24}>
                {/*<CustomButton title={'Add New'} icon={<PlusCircleFilled/>}*/}
                {/*              onClick={() => console.log('Add new WatchList Clicked')}/>                    */}
                <CustomButton title={'Add New'}
                              onClick={() => console.log('Add new WatchList Clicked')}/>
            </Col>
        </Row>
    </div>);
}

export default WatchList;
import {Button, Col, Collapse, Divider, Row, Space, Table, Typography} from "antd";
import React, {useState} from "react";
import {SquareData} from "../../interfaces/squarePage";
// import AirbnbIcon from '../../assets/icons/airbnb-icon.svg';
import Icon from '@ant-design/icons';
import SquareInfoDetailRow from "./SquareInfoDetailRow";
import './SquareInfo.css'
import {getFormattedDate, getOccupancyTableData, getRoundNumber, getSmallestDaysDiffData} from "../../utils";
import {ColumnsType} from "antd/es/table";
import axios from "axios";
import type {CollapseProps} from 'antd';
import GraphChartTimeRange from "../../GroupChart/GraphChartTimeRange/GraphChartTimeRange";
import {TimeFrameEnum} from "../TimeFrameTabs/timeRange.type";

const SquareHeadline = ({squareId, coordinates, airbnbUrl, googleMapsUrl, lastScrapedDate}: {
    squareId: number,
    coordinates: any,
    airbnbUrl: string,
    googleMapsUrl: string,
    lastScrapedDate: string
}) => {

    return (
        <div style={{backgroundColor: '#95CDF7'}}>
            <Row style={{padding: 16}}>
                <Col span={10}>
                    <Space direction={'vertical'} size={1}>
                        <Typography.Text className={'square-headline-title'}>SQUARE #{squareId}</Typography.Text>
                        <Typography.Text className={'square-headline-location'}>Central Athens |
                            Greece</Typography.Text>

                        {/*<Icon component={AirbnbIcon} onClick={() => window.open(squareData.url, '_blank')} className={'airbnb-link'}/>*/}
                    </Space>
                </Col>

                <Col span={14}>
                    <Space direction={'vertical'}>
                        <Typography.Text className={'last-scraped-data'}>Last
                            Scraped: {getFormattedDate(lastScrapedDate)}</Typography.Text>
                        <Space direction={'horizontal'}>
                            <Button shape={'round'}>Coordinates</Button>
                            <Button shape={'round'}>Airbnb</Button>
                            <Button shape={'round'}>GMap</Button>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default SquareHeadline;
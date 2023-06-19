import {Button, Col, Divider, Row, Space, Table, Typography} from "antd";
import React from "react";
import {Occupancy, OccupancyData, SquareData} from "../../interfaces/squarePage";
import {ReactComponent as AirbnbIcon} from '../../assets/icons/airbnb-icon.svg';
import LabelValue from "./LabelValue";
import './SquareInfo.css'
import {getFormattedDate, getOccupancyTableData, getRoundNumber, getSmallestDaysDiffData} from "../../utils";
import {ColumnsType} from "antd/es/table";
import axios from "axios";

const columns: ColumnsType<any> = [
    {
        title: 'Check In',
        dataIndex: ['dates', 'checkIn'],
        key: 'dates.checkIn',

    },
    {
        title: 'Check Out',
        dataIndex: ['dates', 'checkOut'],
        key: 'dates.checkOut',
    },
    {
        title: 'Occupation',
        dataIndex: 'average',
        key: 'average',
        render: (value) => `${getRoundNumber(value)}%`
    }];

const columns2: ColumnsType<any> = [
    {
        title: 'Days Before',
        dataIndex: 'dayDiff',
        key: 'dayDiff',
    },
    {
        title: 'Occupation',
        dataIndex: 'value',
        key: 'value',
        render: (value) => `${getRoundNumber(value)}%`
    }];
const SquareInfo = ({squareData, totalSquares}: { squareData: null | SquareData, totalSquares: number }) => {
    if (!squareData) {
        return <h1>squareData not set</h1>;
    }

    const updateSquare = () => {
        axios.post(`http://localhost:3000/properties/scraper/squares`, {

            startId: squareData.id,
            endId: squareData.id,

        });

    }
    const districtOccupancies = getSmallestDaysDiffData(squareData.occupancy);
    const occupanciesTable = getOccupancyTableData(districtOccupancies);

    return (<>
        <Row>
            <Col span={15}>
                <Space>
                    <Typography.Text className={'square-headline'}>Square {squareData.id}</Typography.Text>
                    <AirbnbIcon onClick={() => window.open(squareData.url, '_blank')} className={'airbnb-link'}/>
                </Space>
            </Col>

            <Col span={9}>
                <Typography.Text className={'last-scraped-data'}>Last
                    Scraped: {getFormattedDate(squareData.last_scraped_date)}</Typography.Text>
            </Col>
        </Row>
        <Row>
            <Col span={18}>
                <Row style={{marginTop: 16}}>
                    <LabelValue label={'Properties count'}
                                value={`${squareData.properties.data.length} (${squareData.properties.place} out of ${totalSquares})`}/>
                </Row>
                <Row style={{marginTop: 8}}>
                    <LabelValue label={'Avg. Cost Per Night'}
                                value={`${getRoundNumber(squareData.pricePerNightWeekend.average)}${squareData.currency} (${squareData.pricePerNightWeekend.place} out of ${totalSquares})`}/>
                </Row>
                <Row style={{marginTop: 8}}>
                    <LabelValue label={'Avg. Rating'}
                                value={`${squareData.ratings.average ? getRoundNumber(squareData.ratings.average) : '-'} (${squareData.ratings.place} out of ${totalSquares})`}/>
                </Row>
                <Row style={{marginTop: 8}}>
                    <LabelValue label={'Avg. Location'}
                                value={`${getRoundNumber(squareData.ratings.details.location.value)} (${squareData.ratings.details.location.place} out of ${totalSquares})`}/>
                    <Divider orientation="left">Occupancy</Divider>
                </Row>
            </Col>
            <Col span={6}>
                <Space direction={"vertical"}>
                    <Button style={{width: '100%'}} onClick={() => updateSquare()}>Update Square</Button>
                    <Button style={{width: '100%'}}>Check Availability</Button>
                </Space>
            </Col>
        </Row>
        <Row>
            <Typography.Text className={'occupancies-text'}>
                {getRoundNumber(districtOccupancies.average)}% for {districtOccupancies.data.length} dates
            </Typography.Text>
        </Row>
        <Row>
            <Table dataSource={occupanciesTable.data ?? []} columns={columns} size={'small'} bordered
                   expandable={{
                       expandedRowRender: (record) => <Table dataSource={record.data ?? []} columns={columns2}
                                                             size={'small'} bordered pagination={false}/>,
                       rowExpandable: (record) => true,
                   }}
            />
        </Row>
    </>)
}

export default SquareInfo;
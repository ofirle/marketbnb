import {Button, Col, Collapse, Divider, Row, Space, Table, Typography} from "antd";
import React, {useState} from "react";
import {Occupancy, SquareData} from "../../interfaces/squarePage";
import {ReactComponent as AirbnbIcon} from '../../assets/icons/airbnb-icon.svg';
import LabelValue from "./LabelValue";
import './SquareInfo.css'
import {getFormattedDate, getOccupancyTableData, getRoundNumber, getSmallestDaysDiffData} from "../../utils";
import {ColumnsType} from "antd/es/table";
import axios from "axios";
import type {CollapseProps} from 'antd';
import GraphChartTimeRange from "../../GroupChart/GraphChartTimeRange/GraphChartTimeRange";
import {TimeFrameEnum} from "../../GroupChart/GraphChartTimeRange/timeRange.type";


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

const OccupancyData = [
    {
        name: 'Weekend',
        xField: '30-04',
        value: 88,
    },
    {
        name: 'MidWeek',
        xField: '30-04',
        value: 65,
    },
    {
        name: 'Weekend',
        xField: '07-05',
        value: 84,
    },
    {
        name: 'MidWeek',
        xField: '07-05',
        value: 71,
    },
    {
        name: 'Weekend',
        xField: '14-05',
        value: 87,
    },
    {
        name: 'MidWeek',
        xField: '14-05',
        value: 68,
    },
    {
        name: 'Weekend',
        xField: '21-05',
        value: 91,
    },
    {
        name: 'MidWeek',
        xField: '21-05',
        value: 74,
    },
    {
        name: 'Weekend',
        xField: '28-05',
        value: 89,
    },
    {
        name: 'MidWeek',
        xField: '28-05',
        value: 62,
    },
    {
        name: 'Weekend',
        xField: '04-06',
        value: 85,
    },
    {
        name: 'MidWeek',
        xField: '04-06',
        value: 75,
    },
];
const propertiesData = [
    {
        xField: '30-04',
        value: 50,
    },
    {
        xField: '07-05',
        value: 53,
    },
    {
        xField: '14-05',
        value: 58,
    },
    {
        xField: '21-05',
        value: 54,
    },
    {
        xField: '28-05',
        value: 57,
    },
    {
        xField: '04-06',
        value: 60,
    },
    {
        xField: '11-06',
        value: 51,
    },
    {
        xField: '18-06',
        value: 59,
    },
];
const SquareInfo = ({squareData, totalSquares}: { squareData: null | SquareData, totalSquares: number }) => {
    const [propertyTimeFrame, setPropertyTimeFrame] = useState(TimeFrameEnum.Months3)
    const [occupancyTimeFrame, setOccupancyTimeFrame] = useState(TimeFrameEnum.Months3)
    if (!squareData) {
        return <h1>squareData not set</h1>;
    }

    const updateSquare = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/properties/scraper/squares`, {
            startId: squareData.id,
            endId: squareData.id,

        });

    }
    const districtOccupancies = getSmallestDaysDiffData(squareData.occupancy);
    const occupanciesTable = getOccupancyTableData(districtOccupancies);

    const getData = (timeFrameKey: TimeFrameEnum, data: any[]) => {
        switch (timeFrameKey) {
            case TimeFrameEnum.Weeks4:
                return data.slice(0,4);
            case TimeFrameEnum.Months3:
                return data.slice(0,6);
            case TimeFrameEnum.Year:
                return data.slice(0,10);
            case TimeFrameEnum.AllTime:
                return data;
        }
    }
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Properties',
            children: <GraphChartTimeRange onTimeFrameChanged={setPropertyTimeFrame} isGroup={false} selected={propertyTimeFrame}  data={getData(propertyTimeFrame, propertiesData)}/>,
        },
    ];
    const items2: CollapseProps['items'] = [
        {
            key: 'occupancy',
            label: 'Occupancy',
            children: <GraphChartTimeRange onTimeFrameChanged={setOccupancyTimeFrame} selected={occupancyTimeFrame} data={getData(occupancyTimeFrame, OccupancyData)} isGroup={true}/>,
        },
    ];

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
                </Row>
            </Col>
            <Col span={6}>
                <Space direction={"vertical"}>
                    <Button style={{width: '100%'}} onClick={() => updateSquare()}>Update Square</Button>
                    <Button style={{width: '100%'}}>Check Availability</Button>
                </Space>
            </Col>
        </Row>
        <Divider orientation="left">Occupancy</Divider>
        <Row>
            <Typography.Text className={'occupancies-text'}>
                {getRoundNumber(districtOccupancies.average)}% for {districtOccupancies.data.length} dates
            </Typography.Text>
        </Row>
        <Row>
            <Col span={24}>
                <Collapse ghost items={[...items]}/>
            </Col>
        </Row>
        <Row>
            <Col span={24}>
                <Collapse ghost items={[...items2]} defaultActiveKey={['properties_count']}/>
            </Col>
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
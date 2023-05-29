import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
// import './index.css';
import './App.css';
import {ColumnsType} from "antd/es/table";
import {Col, Divider, Row, Slider, Space, Switch, Table, Typography} from "antd";
import Icon from "@ant-design/icons";
import GroupChart from "./GroupChart/GroupChart";
import MainTable from "./MainTable/MainTable";
import {Circle, GoogleMap, Marker, Polygon, useLoadScript} from "@react-google-maps/api";
import useAxios from "./FetchData/useAxios";
import GoogleMapCustom from "./GoogleMap/GoogleMapCustom";
// const W12BookingStatusData = [
//     {
//         name: 'WeekEnd',
//         xField: 'W1',
//         value: 97,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W2',
//         value: 95,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W3',
//         value: 92,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W4',
//         value: 88,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W5',
//         value: 86,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W6',
//         value: 83,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W7',
//         value: 79,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W8',
//         value: 76,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W9',
//         value: 73,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W10',
//         value: 70,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W11',
//         value: 67,
//     },
//     {
//         name: 'WeekEnd',
//         xField: 'W12',
//         value: 64,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W1',
//         value: 94,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W2',
//         value: 91,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W3',
//         value: 86,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W4',
//         value: 82,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W5',
//         value: 78,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W6',
//         value: 74,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W7',
//         value: 70,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W8',
//         value: 66,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W9',
//         value: 62,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W10',
//         value: 58,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W11',
//         value: 53,
//     },
//     {
//         name: 'MidWeek',
//         xField: 'W12',
//         value: 49,
//     },
// ];
// const BookingAdultStatusData = [
//     {
//         name: 'Thu-Sat',
//         xField: '1',
//         value: 97,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '2',
//         value: 91,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '3',
//         value: 92,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '4',
//         value: 91,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '5',
//         value: 93,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '6',
//         value: 100,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '7',
//         value: 68,
//     },
//     {
//         name: 'Thu-Sat',
//         xField: '8',
//         value: 65,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '1',
//         value: 94,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '2',
//         value: 87,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '3',
//         value: 86,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '4',
//         value: 90,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '5',
//         value: 92,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '6',
//         value: 95,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '7',
//         value: 62,
//     },
//     {
//         name: 'Sun-Wed',
//         xField: '8',
//         value: 55,
//     },
// ];
//
//     interface squareData {
//         week_1: { available: number, occupied: number }
//         mount_1: { available: number, occupied: number };
//         mount_3: { available: number, occupied: number };
//         url: string;
//     }
//
// const AirbnbIconSvg = () => (
//     <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="16px" height="16px">
//         <path fill="#ff5252" d="M42.459,32.519c-1.037-3.336-9.539-19.596-12.12-24.5l-0.026-0.048C29.153,5.559,26.676,4,24,4 s-5.153,1.559-6.291,3.929L17.661,8.02C15.08,12.923,6.578,29.183,5.542,32.518C5.261,33.421,5,34.407,5,35.5 c0,4.687,3.813,8.5,8.5,8.5c4.654,0,7.612-1.949,10.5-5.184C26.888,42.051,29.846,44,34.5,44c4.687,0,8.5-3.813,8.5-8.5 C43,34.407,42.739,33.421,42.459,32.519z M23.999,34.662C22.33,32.515,20,28.881,20,26c0-2.206,1.794-4,4-4s4,1.794,4,4 C28,28.872,25.668,32.511,23.999,34.662z M34.5,41c-3.287,0-5.521-1.107-8.325-4.258C27.878,34.596,31,30.104,31,26 c0-3.86-3.141-7-7-7s-7,3.14-7,7c0,4.104,3.122,8.596,4.825,10.742C19.021,39.893,16.787,41,13.5,41C10.468,41,8,38.533,8,35.5 c0-0.653,0.162-1.308,0.406-2.09C9.17,30.95,15.3,18.948,20.316,9.417l0.076-0.146C21.055,7.891,22.471,7,24,7 s2.945,0.891,3.615,2.285l0.068,0.132C32.7,18.948,38.83,30.95,39.595,33.411C39.838,34.192,40,34.847,40,35.5 C40,38.533,37.532,41,34.5,41z"/>
//     </svg>
// );

const App = () => {
    const { isLoaded} = useLoadScript({googleMapsApiKey: "" })
    // if(!isLoaded) return <div>Loading...</div>;
    const [disabled, setDisabled] = useState(false);
    const [prices, setPrices] = useState({min: 0, max: 1300});
    const [propertiesCount, setPropertiesCount] = useState(0);

    const onChange = (checked: boolean) => {
        setDisabled(checked);
    };

    return (<>
            <Row>
                <Col span={24}>
                    Properties Count: <Slider defaultValue={0} disabled={disabled} min={0} max={230} style={{width: '50%'}} onAfterChange={(value) => setPropertiesCount(value)}/>
                    Prices: <Slider range defaultValue={[0, 1300]} disabled={disabled} min={0} max={1300} style={{width: '50%'}} onAfterChange={(values) => setPrices({min: values[0], max: values[1]})}/>
                    Disabled: <Switch size="small" checked={disabled} onChange={onChange} />
                </Col>
            </Row>
            <Row>
                {isLoaded && <GoogleMapCustom filters={{propertiesCount: propertiesCount, prices: prices}}/>}
            </Row>
        </>
        )
    // interface DataType {
    //     key: string;
    //     // coordinates: {
    //     //     sw_lat: string,
    //     //     sw_lng: string,
    //     //     ne_lat: string,
    //     //     ne_lng: string
    //     // }
    //     one: squareData
    //     two: squareData
    //     three: squareData
    //     four: squareData
    // }

    // const columns: ColumnsType<DataType> = [
    //     {
    //         title: 'RowHead',
    //         dataIndex: 'key',
    //         rowScope: 'row',
    //     },
    //     {
    //         title: 'one',
    //         dataIndex: 'one',
    //         width: 200,
    //         render: (value) => <CellComponent data={value}/> ,
    //     },
    //     {
    //         title: 'two',
    //         dataIndex: 'two',
    //         width: 200,
    //         render: (value) => <CellComponent data={value}/> ,
    //     },
    //     {
    //         title: 'three',
    //         dataIndex: 'three',
    //         width: 200,
    //         render: (value) => <CellComponent data={value}/> ,
    //     },
    //     {
    //         title: 'four',
    //         dataIndex: 'four',
    //         width: 200,
    //         render: (value) => <CellComponent data={value}/> ,
    //     },
    // ];
    //
    // const data: DataType[] = [
    //     {
    //         key: '1',
    //         one: {
    //             week_1: { available: 75, occupied: 72 },
    //             mount_1: { available: 30, occupied: 15 },
    //             mount_3: { available: 54, occupied: 45 },
    //             url: "url"
    //         },
    //         two: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         three: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         four: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         }
    //     },
    //     {
    //         key: '2',
    //         one: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         two: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         three: {
    //             week_1: { available: 100, occupied: 80 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         four: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         }
    //     },
    //     {
    //         key: '3',
    //         one: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         two: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         three: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         four: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         }
    //     },
    //     {
    //         key: '4',
    //         one: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         two: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         three: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         },
    //         four: {
    //             week_1: { available: 100, occupied: 52 },
    //             mount_1: { available: 100, occupied: 52 },
    //             mount_3: { available: 100, occupied: 52 },
    //             url: "url"
    //         }
    //     },
    // ];

    const columns = [
        {
            title: 'Square ID',
            dataIndex: 'square_id',
        },
        {
            title: 'Occupancy (%)',
            dataIndex: 'occupancy',
        },
        {
            title: 'Density',
            dataIndex: 'density',
        },
        {
            title: 'Cost Per Night (Avg)',
            dataIndex: 'cost_per_night',
        },

    ]


    // return (
    //     <div className="App">
    //         {/*<Table columns={columns} dataSource={data} bordered />;*/}
    //         {/*<GroupChart data={W12BookingStatusData}/>*/}
    //         {/*<GroupChart data={BookingAdultStatusData}/>*/}
    //         {/*<GroupChart data={BookingAdultStatusData}/>*/}
    //         {/*<MainTable />;*/}
    //     </div>
    // );
}

export default App;
//
// const CellComponent = ({data} : {data: squareData}) => {
//     const colors = ['#5DBB63', '#FFFDD0', '#FA8072'];
//
//
//
//     const week1OccupiedRate = Math.ceil((data.week_1.occupied/data.week_1.available) * 100);
//     let color;
//     if(week1OccupiedRate >= 90) color = colors[0];
//     else if(week1OccupiedRate >= 65) color = colors[1];
//     else color = colors[2];
//
//     return (
//         <div style={{backgroundColor: color, cursor: "pointer"}}>
//             <CellComponentText data={data.week_1} title={'Week 1'} />
//             {/*<Divider />*/}
//             <CellComponentText data={data.mount_1} title={'Month 1'} />
//             {/*<Divider />*/}
//             <CellComponentText data={data.mount_3} title={'Month 3'} />
//             <Space>
//                 <Icon component={AirbnbIconSvg} />
//
//             </Space>
//         </div>
//     )
// }
//
// const CellComponentText = ({ title, data } : { title: string, data: { available: number, occupied: number }}) => {
//     return (
//         <Row>
//             <Typography className={'cell-component-text-headline'}>{title}: </Typography>
//             <Typography className={'cell-component-text'}>{data.occupied}/{data.available} ({Math.ceil((data.occupied/data.available) * 100)}%)</Typography>
//         </Row>
//
//     )
// }



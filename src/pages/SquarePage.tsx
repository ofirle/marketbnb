import {Col, Divider, Row, Skeleton, Space, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {SquareData} from "../interfaces/squarePage";
import PropertiesTable from "../components/PropertiesTable/PropertiesTable";
import SquareInfo from "../components/SquareInfo/SquareInfo";
import axios from "axios";
import SquareHeadline from "../components/SquareInfo/SquareHeadline";
import {TimeFrameEnum} from "../components/TimeFrameTabs/timeRange.type";
import TimeFrameTabs from "../components/TimeFrameTabs/TimeFrameTabs";

const SquarePage = ({id}: { id: number | null }) => {
    const [squareData, setSquareData] = useState<null | SquareData>(null)
    const [timeFrame, setTimeFrame] = useState(TimeFrameEnum.Months3)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id === null) return;

        async function fetchData() {
            setLoading(true)
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/coordinates/info/${id}`, {method: "get"});
            setLoading(false)
            setSquareData(request.data)
        }

        fetchData();
    }, [id, timeFrame])
    if (!squareData) return <Skeleton active/>
    const totalSquares = 936
    return (<>
        <SquareHeadline squareId={squareData.id} coordinates={'123,123'} airbnbUrl={squareData.url}
                        googleMapsUrl={'google.link'} lastScrapedDate={squareData.last_scraped_date}/>
        <div style={{padding: 16}}>
            <Row align={'middle'}>
                <Col span={6}>
                    <Typography.Text className={'square-headline-overview'}>Overview</Typography.Text>
                </Col>
                <Col span={'auto'}>
                    <TimeFrameTabs selected={timeFrame} onClick={(key) => {
                        setTimeFrame(key)
                    }}/>
                </Col>
            </Row>
            {loading ? <Skeleton active/> : <>
                <SquareInfo totalSquares={totalSquares} squareData={squareData}/>
                <Divider orientation="left">Properties</Divider>
                <Row>
                    <Col span={24}>
                        <PropertiesTable properties={squareData?.properties?.data || []}/>
                    </Col>
                </Row>
            </>
            }
        </div>
    </>);
}

export default SquarePage;
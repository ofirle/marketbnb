import { Col, Row } from "antd";
import GroupChart from "../GroupChart";
import React from "react";
import {TimeFrameEnum} from "../../components/TimeFrameTabs/timeRange.type";
import TimeFrameTabs from "../../components/TimeFrameTabs/TimeFrameTabs";

const GraphChartTimeRange = ({data, selected, onTimeFrameChanged, isGroup = false}: { data: any[], selected: TimeFrameEnum, onTimeFrameChanged: (key: TimeFrameEnum) => void, isGroup?: boolean }) => {


    const onClickedTimeFrame = (selectedKey: TimeFrameEnum) => {
        onTimeFrameChanged(selectedKey);
    }
    return (<>
        <Row>
            <Col span={24}>
                <GroupChart isGroup={isGroup} data={data} averageLine={true}/>
            </Col>
        </Row>
        <Row style={{marginTop: 16}}>
            <Col span={24} style={{display: 'flex', justifyContent: 'center'}}>
                <TimeFrameTabs selected={selected} onClick={onClickedTimeFrame}/>
            </Col>
        </Row>
    </>)
};

export default GraphChartTimeRange;
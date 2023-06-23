import {Button, Col, Row, Typography, Space} from "antd";
import GroupChart from "../GroupChart";
import React, {useState} from "react";
import {TimeFrameEnum} from "./timeRange.type";
import TimeRangeOption from "./TimeRangeOption";

const GraphChartTimeRange = ({data, selected, onTimeFrameChanged, isGroup = false}: { data: any[], selected: TimeFrameEnum, onTimeFrameChanged: (key: TimeFrameEnum) => void, isGroup?: boolean }) => {
    const timeFrames = [
        {
            key: TimeFrameEnum.Weeks4,
            title: '4 Weeks'
        },
        {
            key: TimeFrameEnum.Months3,
            title: '3 Months'
        },
        {
            key: TimeFrameEnum.Year,
            title: 'This Year'
        },
        {
            key: TimeFrameEnum.AllTime,
            title: 'All Time'
        }
    ];

    const onClickedTimeFrame = (selectedKey: TimeFrameEnum) => {
        onTimeFrameChanged(selectedKey);
    }
    return (<>
        <Row>
            <Col span={24}>
                <GroupChart isGroup={isGroup} data={data} averageLine={true}/>
            </Col>
        </Row>
        <Row style={{marginTop: 16}} justify="center">
            <Col span={24}>
                <Space size={'large'}>
                {/*{timeFrames.map(item => <Button key={item.key} onClick={() => onClickedTimeFrame(item.key)}>{item.title}</Button>)}*/}
                    {timeFrames.map(item => <TimeRangeOption key={item.key} title={item.title} onClick={() => onClickedTimeFrame(item.key)} isSelected={item.key===selected}/>)}
                </Space>
            </Col>
        </Row>
    </>)
};

export default GraphChartTimeRange;
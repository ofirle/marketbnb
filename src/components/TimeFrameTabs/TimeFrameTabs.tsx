import {Space} from "antd";
import React from "react";
import {TimeFrameEnum} from "./timeRange.type";
import TimeRangeOption from "./TimeRangeOption";

const TimeFrameTabs = ({selected, onClick}: {
    selected: TimeFrameEnum,
    onClick: (key: TimeFrameEnum) => void,
}) => {
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
        onClick(selectedKey);
    }

    return (<>
        <Space size={'large'}>
            {timeFrames.map(item => <TimeRangeOption key={item.key} title={item.title}
                                                     onClick={() => onClickedTimeFrame(item.key)}
                                                     isSelected={item.key === selected}/>)}
        </Space>
    </>)
};

export default TimeFrameTabs;
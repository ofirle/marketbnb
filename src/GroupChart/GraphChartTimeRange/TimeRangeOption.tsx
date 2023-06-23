import {Typography} from "antd";
import React from "react";
import {TimeFrameEnum} from "./timeRange.type";
import './TimeRangeOption.css'


const TimeRangeOption = ({key, title, isSelected, onClick}: {key: TimeFrameEnum, title: string, isSelected: boolean, onClick: (key: TimeFrameEnum) => void}) => {
    const classNames = `option ${isSelected ? 'isSelected' : ''}`
    return <Typography.Text key={key} onClick={() => onClick(key)} className={classNames}>{title}</Typography.Text>
}

export default TimeRangeOption;
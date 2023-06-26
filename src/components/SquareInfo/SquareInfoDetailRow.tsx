import {Col, Space, Tooltip, Typography} from "antd";
import React from "react";
import './SquareInfoDetailRow.css'
import {ArrowDownOutlined, ArrowUpOutlined, InfoCircleFilled} from "@ant-design/icons";

const SquareInfoDetailRow = ({label, value, statistics, tooltipMessage, fluctuate, timeFrameChange}: {
    label: string, value: string, statistics: {
        percentile: number,
        place: number,
        totalCount: number
    }, tooltipMessage: string,
    timeFrameChange: {
        value: number,
        suffix?: string
    }
    fluctuate: 'INCREASE' | 'DECREASE'
}) => {
    return <>
        <Col span={10}>
            <Space direction={'horizontal'}>
                <Tooltip placement="top" title={tooltipMessage}>
                    <InfoCircleFilled className={'info-icon'}/>
                </Tooltip>
                <Typography.Text className={'label'}>{label}:</Typography.Text>
                <Typography.Text className={'label'}>{value}</Typography.Text>
                <Typography.Text className={'label'}>{`(${timeFrameChange.value >= 0 ? '+' : ''}${timeFrameChange.value}${timeFrameChange.suffix ?? ''})`}</Typography.Text>
            </Space>
        </Col>
        <Col span={4}>
                <Typography.Text
                    className={'value'}>{`${statistics.percentile}% (${statistics.place}/${statistics.totalCount})`}</Typography.Text>
        </Col>
        <Col span={'auto'}>
                {fluctuate === 'INCREASE' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        </Col>
    </>
}
export default SquareInfoDetailRow;
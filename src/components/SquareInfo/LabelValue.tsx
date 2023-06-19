import {Col, Row, Typography} from "antd";
import React from "react";
import './LabelValue.css'

const LabelValue = ({label, value}: {label: string, value: string}) => {
    return <>
        <Col span={8}>
            <Typography.Text className={'label'}>{label}</Typography.Text>
        </Col>
        <Col span={16}>
            <Typography.Text className={'value'}>{value}</Typography.Text>
        </Col>
    </>
}

export default LabelValue;
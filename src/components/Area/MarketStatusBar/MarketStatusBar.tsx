import React from 'react';
import {Col, Row, Space, Typography} from "antd";
import styles from './MarketStatusBar.module.css'
import CustomButton from "../../UI/Button/CustomButton";
import {IRegion} from "./types";

const MarketStatusBar = ({region, totalSquares}: {
    region: IRegion,
    totalSquares: number,
}) => {
    return (
        <div className={styles.marketMenuLayout}>
            <Row>
                <Col span={20}>
                    <Space direction={'vertical'} size={"small"} style={{marginLeft: 8}}>
                        <Typography.Text
                            className={styles.marketStatusTitles}>{region.market.country.label} | {region.market.label} {region.subMarket ? `| ${region?.subMarket?.label}` : '' }</Typography.Text>
                        <Typography.Text className={styles.marketStatusDetails}>Total SQRs: {totalSquares} |
                            Priority: {region.priority}</Typography.Text>
                    </Space>
                </Col>
                <Col span={4}>
                    <div className={styles.buttonContainer}>
                        <CustomButton title={'Edit'} onClick={() => console.log('Edit Status Bar Clicked')}/>
                    </div>
                </Col>
            </Row>
        </div>);
}

export default MarketStatusBar;




import React from 'react';
import {Button, Col, Row, Select, Space, Typography} from "antd";
import styles from './MarketStatusBar.module.css'
import Icon, {LeftCircleFilled, PlusCircleFilled, RightCircleFilled, SettingFilled} from "@ant-design/icons";
import CustomButton from "../../UI/Button/CustomButton";
import BackArrow from '../../../assets/icons/arrow-back.svg'

const MarketStatusBar = ({country, market, subMarket, selectionId, totalSquares, priority}: {
    country: string,
    market: string,
    subMarket?: string,
    selectionId: number,
    totalSquares: number,
    priority: number
}) => {
    return (
        <div className={styles.marketMenuLayout}>
            {/*<Icon component={BackArrow} />*/}
            <Row>
                <Col span={20}>
                    <Space direction={'vertical'} size={"small"} style={{marginLeft: 8}}>
                        <Typography.Text
                            className={styles.marketStatusTitles}>{country} | {market} | {subMarket}</Typography.Text>
                        <Typography.Text className={styles.marketStatusDetails}>Total SQRs: {totalSquares} |
                            Priority: {priority}</Typography.Text>
                        {/*<Button type={"primary"} icon={} shape={"circle"} size={"middle"}/>*/}
                    </Space>
                </Col>
                <Col span={4}>
                    <div className={styles.buttonContainer}>
                        {/*<CustomButton title={'Edit'} icon={<SettingFilled/>} onClick={() => console.log('Edit Status Bar Clicked')} />*/}
                        <CustomButton title={'Edit'} onClick={() => console.log('Edit Status Bar Clicked')}/>
                    </div>
                </Col>
            </Row>
        </div>);
}

export default MarketStatusBar;




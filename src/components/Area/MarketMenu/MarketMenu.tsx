import React from 'react';
import {Button, Col, Row, Select, Space, Typography} from "antd";
import styles from './MarketMenu.module.css'
import {LeftCircleFilled, PlusCircleFilled, RightCircleFilled, SettingFilled} from "@ant-design/icons";
import CustomButton from "../../UI/Button/CustomButton";
const MarketMenu = () => {
    return (
        <div className={styles.marketMenuLayout}>
            <Row justify="space-between">
                <Col>
                    <Typography.Text className={styles.marketMenuTitle}>Market Menu</Typography.Text>
                </Col>
                <Col>
                    <LeftCircleFilled style={{fontSize: 24, cursor: "pointer"}} />
                </Col>
            </Row>
            <Row style={{marginTop: 16}}>
                <Col span={24}>
                    <Space direction={'vertical'} style={{width: '100%'}} size={"large"}>
                        <Select options={[{value: 'GR', label: 'Greece'}, {value: 'IL', label: 'Israel'}]}
                                className={styles.marketMenuSelect} placeholder={'Select Country'}/>
                        <Select options={[{value: 'TEL_AVIV', label: 'Tel Aviv'}, {value: 'ATHENS', label: 'Athens'}]}
                                className={styles.marketMenuSelect} placeholder={'Select Market'}/>
                        <Select options={[{value: 'KOUKAKI', label: 'Koukaki'}, {value: 'TEL_AVIV_NORTH', label: 'North Tel Aviv'}]}
                                className={styles.marketMenuSelect} placeholder={'Select Sub Market)'}/>
                    </Space>
                </Col>
            </Row>
            <Row style={{marginTop: 24}} justify="space-between">
                <Col>
                    {/*<CustomButton title={'Add New'} icon={<PlusCircleFilled/>} onClick={() => console.log('Add new Region Clicked')} />*/}
                    <CustomButton title={'Add New'} onClick={() => console.log('Add new Region Clicked')} />
                </Col>
                <Col>
                    {/*<CustomButton title={'Lets Go!'} icon={<RightCircleFilled/>} onClick={() => console.log('Lets Go! Region Clicked')} />*/}
                    <CustomButton title={'Lets Go!'} onClick={() => console.log('Lets Go! Region Clicked')} />
                </Col>
            </Row>
        </div>);
}

export default MarketMenu;




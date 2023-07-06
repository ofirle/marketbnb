import React from 'react';
import {Button, Col, Row, Select, Space, Typography} from "antd";
import styles from './WatchList.module.css'
import {LeftCircleFilled, PlusCircleFilled, RightCircleFilled} from "@ant-design/icons";
import WatchListItem from "./WatchListItem";
import CustomButton from "../../UI/Button/CustomButton";

const WatchList = () => {
    return (
        <div className={styles.marketMenuLayout}>
            <Row justify="space-between">
                <Col>
                    <Typography.Text className={styles.marketMenuTitle}>Watch List</Typography.Text>
                </Col>
                <Col>
                    <LeftCircleFilled style={{fontSize: 24, cursor: "pointer"}} />
                </Col>
            </Row>
            <Row style={{marginTop: 16}}>
                <Col span={24}>
                    <Space direction={'vertical'} style={{width: '100%'}} size={"small"}>
                        <WatchListItem title={'Filopappou 11, Athens'} visible={true}/>
                        <WatchListItem title={'Menalaou 37, Athens'} visible={false}/>
                        <WatchListItem title={'Dimofountous 11, Athens'} visible={true}/>
                    </Space>
                </Col>
            </Row>
            <Row style={{marginTop: 24}}>
                <Col span={24}>
                    {/*<CustomButton title={'Add New'} icon={<PlusCircleFilled/>}*/}
                    {/*              onClick={() => console.log('Add new WatchList Clicked')}/>                    */}
                    <CustomButton title={'Add New'}
                                  onClick={() => console.log('Add new WatchList Clicked')}/>
                </Col>
            </Row>
        </div>);
}

export default WatchList;




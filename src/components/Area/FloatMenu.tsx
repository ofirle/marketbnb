import {Col, Row, Typography} from "antd";
import {LeftCircleFilled} from "@ant-design/icons";
import React from "react";
import styles from './FloatMenu.module.css'

const FloatMenu = ({ title, children, topStyle }: {title: string; children: React.ReactNode, topStyle: number}) => {
    return (
        <div className={styles.menuLayout} style={{top: topStyle}}>
            <Row justify="space-between">
                <Col>
                    <Typography.Text className={styles.menuTitle}>{title}</Typography.Text>
                </Col>
                <Col>
                    <LeftCircleFilled style={{fontSize: 24, cursor: "pointer"}}/>
                </Col>
            </Row>
            {children}
        </div>);
}

export default FloatMenu;
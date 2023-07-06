import styles from "./CustomButton.module.css";
import React, {ReactNode} from "react";
import {Button, Space, Typography} from "antd";
import Icon from "@ant-design/icons";
import {AntdIcon} from "../types";

const CustomButton = ({title, icon, onClick, disabled = false, loading = false}: {
    title: string,
    icon?: AntdIcon,
    onClick: () => void,
    disabled?: boolean,
    loading?: boolean,
}) => {


    return (
        <Button shape="round" size="middle" className={styles.iconButton} onClick={onClick}>
            <Space direction={"horizontal"}>
                <Typography.Text className={styles.buttonText}>{title}</Typography.Text>
                {icon && <Icon component={icon}/>}
            </Space>
        </Button>
    )
}

export default CustomButton;
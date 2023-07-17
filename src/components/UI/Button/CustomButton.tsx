import styles from "./CustomButton.module.css";
import React, {ReactNode} from "react";
import {Button, Space, Typography} from "antd";
import Icon from "@ant-design/icons";
import {AntdIcon} from "../types";
import classNames from "classnames";

type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'link' | 'text';
const CustomButton = ({title, icon, onClick, type = 'default', disabled = false, loading = false}: {
    title: string,
    icon?: AntdIcon,
    onClick: () => void,
    disabled?: boolean,
    loading?: boolean,
    type?: ButtonType
}) => {
    let buttonClassNames = classNames(styles.iconButton, { [styles.disabled]: disabled });

    return (
        <Button shape="round" size="middle" className={buttonClassNames} onClick={onClick} type={type} disabled={disabled}>
            <Space direction={"horizontal"}>
                <Typography.Text className={styles.buttonText}>{title}</Typography.Text>
                {icon && <Icon component={icon}/>}
            </Space>
        </Button>
    )
}

export default CustomButton;
import React, {JSX, useState} from 'react';
import {Popconfirm, notification} from 'antd';

const PopupConfirmation = ({content, title, notificationMessage, action, children}: {
    content: string,
    title: string,
    notificationMessage: string,
    action: Function,
    children: JSX.Element
}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const showPopconfirm = () => {
        setOpen(true);
    };

    const handleOk = async () => {
        setConfirmLoading(true);

        // setTimeout(() => {
        const response = await action();
        console.log(response, "handleOk")
        setOpen(false);
        setConfirmLoading(false);
        if (response.type === 'SUCCESS') {
            api.success({
                message: `Done!`,
                description:
                notificationMessage,
                placement: 'top',
            });
        }
        // }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const popConfirmButton = React.cloneElement(children, {onClick: showPopconfirm});


    return (
        <>
            {contextHolder}
            <Popconfirm
                title={title}
                description={content}
                open={open}
                onConfirm={handleOk}
                okButtonProps={{loading: confirmLoading}}
                onCancel={handleCancel}
            >
                {popConfirmButton}
            </Popconfirm>
        </>
    );
};

export default PopupConfirmation;
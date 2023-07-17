import {GeographicalEntity} from "./types";
import {Form, FormInstance, Modal} from "antd";
import {useForm} from "antd/es/form/Form";
import {JSX} from "react";


export const ModalGeographicalEntity = ({title, open, onClose, children}: {title: string, open: boolean, onClose: () => void, children: JSX.Element}) => {
    // const [form] = Form.useForm();
    return <Modal title={title} open={open} width={400} onCancel={onClose} footer={null}>
        {children}
    </Modal>

}
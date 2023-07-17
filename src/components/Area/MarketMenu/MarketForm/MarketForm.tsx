import {Button, Form, Input, Spin} from "antd";
import axios from "axios";
import {useState} from "react";
export const CountryForm = ({onSuccess}: {onSuccess: () => void}) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);
    const layout = {
        labelCol: {span: 4 },
    };

    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
    const onFinish = async (values: any) => {
        setLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/countries`, {
            ...values
        });
        setLoading(false);
        if(response.status === 201) {
            onSuccess();
        }

        console.log(response);
    }
    const onReset = () => {
        form.resetFields();
    };
    return (
        <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{maxWidth: 400}}
        >
            {loading ? <Spin /> : null}
            <Form.Item name="label" label="Label" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item name="key" label="Key" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>);
}
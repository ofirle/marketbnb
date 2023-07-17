import {Button, Form, Input, Select, Spin} from "antd";
import axios from "axios";
import React, {useEffect, useState} from "react";
import useFilterRegion from "../useFilterRegions";
import styles from "../MarketMenu.module.css";
export const SubMarketForm = ({onSuccess}: {onSuccess: () => void}) => {
    const {
        fetchMarkets,
        marketOptions,
        marketLoading,
    } = useFilterRegion()
    // const [marketOptions, setMarketOptions] = useState([]);
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);
    const layout = {
        labelCol: {span: 4 },
    };

    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
    useEffect(() => {
        fetchMarkets();
    }, [])
    const onFinish = async (values: any) => {
        console.log(values);
        setLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/sub_markets`, {
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
            <Form.Item name="marketId" label="Market" rules={[{required: true}]}>
                <Select options={marketOptions}
                        className={styles.marketMenuSelect} placeholder={'Select Market'}
                        loading={marketLoading} style={{width: 200}}/>
            </Form.Item>
            <Form.Item name="label" label="Label" rules={[{required: true}]}>
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
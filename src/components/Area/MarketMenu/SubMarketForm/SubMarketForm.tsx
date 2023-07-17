import {Button, Form, Input, Select, Spin} from "antd";
import axios from "axios";
import React, {useState} from "react";
import useFilterRegion from "../useFilterRegions";
import styles from "../MarketMenu.module.css";
export const MarketForm = ({onSuccess}: {onSuccess: () => void}) => {
    const {
        refetchCountries,
        countriesOptions,
        countrySelected,
        setCountrySelected,
        countryLoading,
    } = useFilterRegion()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false);
    const layout = {
        labelCol: {span: 4 },
    };

    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
    const onFinish = async (values: any) => {
        console.log(values);
        setLoading(true);
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/markets`, {
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
            <Form.Item name="countryId" label="Country" rules={[{required: true}]}>
                <Select options={countriesOptions} value={countrySelected}
                        className={styles.marketMenuSelect} placeholder={'Select Country'}
                        onChange={(selectedValue) => setCountrySelected(selectedValue)}
                        loading={countryLoading} style={{width: 200}}/>
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
import {Col, Form, Modal, Row, Select} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
// import {useRecoilState} from "recoil";
// import {propertiesPricesFilter, squarePricesFilter} from "../../Atoms/FiltersAtoms";
// import HistogramSlider from "../HistogramSlider/HistogramSlider";
// import {useForm} from "antd/es/form/Form";
// import FormItemLabel from "../RuleSettings/components/FormItemLabel";
import {Dropdown} from "../UI/Form/Dropdown/Dropdown";
import {OptionItem} from "../UI/Form/Dropdown/dropdown.types";
import {InputAutoComplete} from "../UI/Form/AutoComplete/InputAutoComplete";

const regionId = 1
const CreateArea = ({open, onClose}: { open: boolean; onClose: () => void }) => {
    const [form] = Form.useForm();
    const [regionsData, setRegionsData] = useState<{ country: string; area: string }[]>([]);
    const [countriesLogin, setCountriesLogin] = useState<boolean>(true);
    const [countries, setCountries] = useState<OptionItem[]>([]);
    const [areas, setAreas] = useState<OptionItem[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    // const countriesSelected = Form.useWatch('country', form);
    const noCountriesSelected = selectedCountry === null;
    useEffect(() => {
        console.log(selectedCountry, "selectedCountry");
        if (noCountriesSelected) setAreas([]);
        const areasOptions = regionsData.filter((item) => item.country === selectedCountry).map((item) => {
            return {
                value: item.area,
                label: item.area,
            }
        })
        setAreas(areasOptions);
    }, [selectedCountry])


    useEffect(() => {
        async function fetchData() {
            setCountriesLogin(true);
            const request = await axios.get(`${process.env.REACT_APP_API_URL}/regions`, {method: "get"});
            console.log(request, "request");
            const regions = request.data;
            setRegionsData(regions)
            const countriesSet: Set<string> = new Set(regions.map((item: {
                country: string,
                area: string
            }) => item.country))
            const countriesOptions = Array.from(countriesSet).map((item: string) => {
                return {
                    value: item,
                    label: item
                }
            })
            setCountriesLogin(false);
            setCountries(countriesOptions);
            // setAvailableSquares(request.data.squares as number[])
        }

        // fetchData();
    }, [])

    const handleSubmit = () => {
        // setFilters using recoil
        onClose();
    }


    return <Modal title="Create Area" open={open} width={400} onCancel={onClose} onOk={handleSubmit}>
        <Row>
            <Col span={24}>
                <Form form={form}>
                    <Form.Item
                        labelAlign={'left'}
                        required={true}
                        colon={false}
                        label={'Country'}
                        name={'country'}
                        rules={[{required: true, message: 'This is mandatory field'}]}
                    >
                        <InputAutoComplete
                            options={countries}
                            loading={countriesLogin}
                            onSelect={(option: string) => setSelectedCountry(option)}
                        />
                    </Form.Item>
                    <Form.Item
                        labelAlign={'left'}
                        required={true}
                        colon={false}
                        label={'Area'}
                        name={'area'}
                        rules={[{required: true, message: 'This is mandatory field'}]}
                    >
                        <InputAutoComplete
                            options={areas}
                            disabled={noCountriesSelected}
                        />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    </Modal>
}

export default CreateArea;
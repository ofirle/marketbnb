import {Col, Modal, Row} from "antd";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useRecoilState} from "recoil";
import {propertiesPricesFilter, squarePricesFilter} from "../../Atoms/FiltersAtoms";
import HistogramSlider from "../HistogramSlider/HistogramSlider";

const ModalComponent = ({open, onClose}: { open: boolean; onClose: () => void }) => {
    const maxPropertiesPrice = 1060;
    const maxSquaresPrice = 600;
    const step = 20;
    const [availableProperties, setAvailableProperties] = useState<number[]>([]);
    const [availableSquares, setAvailableSquares] = useState<number[]>([]);
    const [squarePriceRage, setSquarePriceRage] = useRecoilState(squarePricesFilter);
    const [propertiesPriceRage, setPropertiesPriceRage] = useRecoilState(propertiesPricesFilter);


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`http://localhost:3000/properties/init?breakdown=${step}&max_price_properties=${maxPropertiesPrice}&max_price_squares=${maxSquaresPrice}`, {method: "get"});
            setAvailableProperties(request.data.properties as number[])
            setAvailableSquares(request.data.squares as number[])
        }

        fetchData();
    }, [])

    const handleSubmit = () => {
        // setFilters using recoil
        onClose();
    }

    return <Modal title="Filters" open={open} width={1000} onCancel={onClose} onOk={handleSubmit}>
        <Row>
            <Col span={24}>
                <HistogramSlider value={propertiesPriceRage} valueSetter={setPropertiesPriceRage} step={step}
                                 maxValue={maxPropertiesPrice}
                                 allData={availableProperties}   />
            </Col>
        </Row>
        <Row style={{marginTop: 16}}>
            <Col span={24}>
                <HistogramSlider value={squarePriceRage} valueSetter={setSquarePriceRage} step={step}
                                 maxValue={maxSquaresPrice}
                                 allData={availableSquares}   />
            </Col>
        </Row>
    </Modal>
}

export default ModalComponent;
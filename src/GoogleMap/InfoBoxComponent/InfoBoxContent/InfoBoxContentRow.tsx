import {Col, Row, Typography} from "antd";
const { Text, Link } = Typography;

const InfoBoxContentRow = ({label, value}: { label: string, value: any }) => {
    return <>
        <Row>
            <Col span={18}>
                <Text strong style={{fontSize: 14}}>{label}</Text>
            </Col>
            <Col span={6}>
                <Text style={{fontSize: 14}}>{value}</Text>
            </Col>
        </Row>
    </>

};

export default InfoBoxContentRow;
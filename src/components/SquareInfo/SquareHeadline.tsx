import {Button, Col, Row, Space, Typography} from "antd";
import React from "react";

import './SquareInfo.css'
import {getFormattedDate} from "../../utils";

import PopupConfirmation from "../Modal/PopupConfirmation";

const SquareHeadline = ({squareId, coordinates, airbnbUrl, googleMapsUrl, lastScrapedDate, deleteAction}: {
    squareId: number,
    coordinates: any,
    airbnbUrl: string,
    googleMapsUrl: string,
    lastScrapedDate: string
    deleteAction: Function
}) => {

    return (
        <div style={{backgroundColor: '#95CDF7', width: '100%'}}>
            <Row style={{padding: 16, width: '100%'}} >
                <Col span={10}>
                    <Space direction={'vertical'} size={1}>
                        <Typography.Text className={'square-headline-title'}>SQUARE #{squareId}</Typography.Text>
                        <Typography.Text className={'square-headline-location'}>Central Athens |
                            Greece</Typography.Text>

                        {/*<Icon component={AirbnbIcon} onClick={() => window.open(squareData.url, '_blank')} className={'airbnb-link'}/>*/}
                    </Space>
                </Col>

                <Col span={14}>
                    <Space direction={'vertical'} >
                        <Space direction={'horizontal'} >
                            <Typography.Text className={'last-scraped-data'}>Last
                                Scraped: {getFormattedDate(lastScrapedDate)}</Typography.Text>
                            <PopupConfirmation action={deleteAction} title={'Delete Square'} content={'Are you sure?'} notificationMessage={`Square ${squareId} deleted successfully`}>
                                <Button shape={'round'} style={{float: 'right'}} type={'primary'} danger>DELETE</Button>
                            </PopupConfirmation>
                        </Space>
                        <Space direction={'horizontal'}>
                            <Button shape={'round'}>Coordinates</Button>
                            <Button shape={'round'}>Airbnb</Button>
                            <Button shape={'round'}>GMap</Button>
                        </Space>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default SquareHeadline;
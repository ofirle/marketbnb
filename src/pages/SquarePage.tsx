import {Col, Divider, Row, Space, Typography} from "antd";
// import DescriptionsItem from "antd/es/descriptions/Item";
import React, {useEffect, useState} from "react";
import {Occupancy, OccupancyData, SquareData} from "../interfaces/squarePage";
// import Icon from '@ant-design/icons';
// import AirbnbIcon from '../assets/icons/airbnb-icon.svg';
// import { ReactComponent as AirbnbIcon } from '../assets/icons/airbnb-icon.svg';
import PropertiesTable from "../components/PropertiesTable/PropertiesTable";
import SquareInfo from "../components/SquareInfo/SquareInfo";
import axios from "axios";



// interface DescriptionItemProps {
//     title: string;
//     content: React.ReactNode;
// }

// const DescriptionItem = ({title, content}: DescriptionItemProps) => (
//     <div className="site-description-item-profile-wrapper">
//         <p className="site-description-item-profile-p-label">{title}:</p>
//         {content}
//     </div>
// );
// const squareData: SquareData = {
//     id: 564,
//     url: 'https://www.airbnb.com/s/Athens--Greece/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&monthly_start_date=2023-06-01&monthly_length=3&price_filter_input_type=0&price_filter_num_nights=2&channel=EXPLORE&query=Tel%20Aviv-Yafo%2C%20Israel&place_id=ChIJH3w7GaZMHRURkD-WwKJy-8E&date_picker_type=flexible_dates&flexible_trip_lengths%5B%5D=weekend_trip&adults=2&source=structured_search_input_header&search_type=filter_change&room_types%5B%5D=Entire%20home%2Fapt&l2_property_type_ids%5B%5D=3&amenities%5B%5D=4&amenities%5B%5D=8&amenities%5B%5D=5&ne_lat=37.96793469846701&ne_lng=23.729646540846772&sw_lat=37.96676414625075&sw_lng=23.728185983414335&zoom=19&search_by_map=true',
//     occupancy: {
//         data: [
//             {
//                 dates: {
//                     checkIn: '2023-06-15',
//                     checkOut: '2023-06-18'
//                 },
//                 daysDiff: 4,
//                 value: 94.5
//             },
//             {
//                 dates: {
//                     checkIn: '2023-06-15',
//                     checkOut: '2023-06-18'
//                 },
//                 daysDiff: 3,
//                 value: 97.4
//             },
//             {
//                 dates: {
//                     checkIn: '2023-06-22',
//                     checkOut: '2023-06-25'
//                 },
//                 daysDiff: 10,
//                 value: 93.4
//             }
//         ]
//     },
//     last_scraped_date: '2023-06-09 14:36:19.503',
//     averagePricePerNightWeekend: 87.4,
//     ratings: {
//         average: 4.1,
//         details: {
//             cleanliness: {value: 3.3},
//             communication: {value: 3.4},
//             checkIn: {value: 3.5},
//             accuracy: {value: 3.6},
//             location: {value: 3.7, place: 45},
//             value: {value: 3.8},
//         },
//         place: 18,
//     },
//     properties: {
//         data: [
//             {
//                 id: 1,
//                 airbnb_id: '123',
//                 guests: 4,
//                 bedrooms: 2,
//                 beds: 3,
//                 baths: 5,
//                 superhost: true,
//                 ratings: {
//                     average: 4.4,
//                     details: {
//                         cleanliness: {value: 3.3},
//                         communication: {value: 3.4},
//                         checkIn: {value: 3.5},
//                         accuracy: {value: 3.6},
//                         location: {value: 3.7},
//                         value: {value: 3.8},
//                     }
//                 },
//                 reviews: {
//                     count: 26,
//                     firstReview: '2022-05-01'
//                 },
//                 cost_per_night_weekend: 89,
//                 editedDate: '2023-06-07 18:04:34.438',
//             }, {
//                 id: 2,
//                 airbnb_id: '456',
//                 guests: 2,
//                 bedrooms: 1,
//                 beds: 1,
//                 baths: 1,
//                 superhost: false,
//                 ratings: {
//                     average: 4.8,
//                     details: {
//                         cleanliness: {value: 3.3},
//                         communication: {value: 3.4},
//                         checkIn: {value: 3.5},
//                         accuracy: {value: 3.6},
//                         location: {value: 3.7},
//                         value: {value: 3.8},
//                     }
//                 },
//                 reviews: {
//                     count: 10,
//                     firstReview: '2022-03-15'
//                 },
//                 cost_per_night_weekend: 120,
//                 editedDate: '2023-06-06 09:22:18.726',
//             },
//             {
//                 id: 3,
//                 airbnb_id: '789',
//                 guests: 3,
//                 bedrooms: 2,
//                 beds: 2,
//                 baths: 2,
//                 superhost: true,
//                 ratings: {
//                     average: 4.6,
//                     details: {
//                         cleanliness: {value: 3.3},
//                         communication: {value: 3.4},
//                         checkIn: {value: 3.5},
//                         accuracy: {value: 3.6},
//                         location: {value: 3.7},
//                         value: {value: 3.8},
//                     }
//                 },
//                 reviews: {
//                     count: 18,
//                     firstReview: '2022-06-20'
//                 },
//                 cost_per_night_weekend: 95,
//                 editedDate: '2023-06-08 14:30:00.000',
//             },
//         ],
//         place: 1,
//     }
// }

// const  getSmallestDaysDiffData = (OccupancyObject: Occupancy): Occupancy => {
//     const data = OccupancyObject.data;
//     const reducedData: { [key: string]: OccupancyData } = data.reduce((acc, curr) => {
//         const {checkIn, checkOut} = curr.date;
//         const key = `${checkIn}-${checkOut}`;
//         const existingData = acc[key];
//         if (!existingData || curr.daysDiff < existingData.daysDiff) {
//             acc[key] = curr;
//         }
//         return acc;
//     }, {} as { [key: string]: OccupancyData });
//     const newOccupancies = Object.values(reducedData);
//
//     const sum = newOccupancies.reduce((acc, obj) => acc + obj.value, 0);
//     const average = sum / newOccupancies.length;
//
//     return {data: Object.values(reducedData), average};
// }
//
// const addZero = (num: number) => {
//     if(num < 10) return `0${num}`;
//     return num;
// }
//
// const getFormattedData = (date: Date): string => {
//     return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
// }

const SquarePage = ({ id }: {id: number | null}) => {
    const [squareData, setSquareData] = useState<null | SquareData>(null)

    useEffect(() => {
        if(id === null) return;
        async function fetchData() {
            const request = await axios.get(`http://localhost:3000/coordinates/info/${id}`, {method: "get"});
            setSquareData(request.data)
        }

        fetchData();
    }, [id])
    const totalSquares = 936
    return (<>
        <SquareInfo totalSquares={totalSquares} squareData={squareData} />
        <Divider orientation="left">Properties</Divider>
        <Row>
            <Col span={24}>
                <PropertiesTable properties={squareData?.properties?.data || []}/>
            </Col>
        </Row>
    </>);
}

export default SquarePage;
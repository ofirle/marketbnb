import {Table} from "antd";
import React, {useEffect} from "react";
import useAxios from "../hooks/useAxios";
import './MainTable.css'
import Link from "antd/es/typography/Link";

const MainTable = () => {
console.log("Main Table Component")
    interface SquareData {
        square_id: number;
        properties_count: number;
        occupancy: number;
        cost_per_night: number | null;
        url: string;
    }

    interface ResponseData {
        data: SquareData[];
    }
    const body = { checkIn: '2023-05-25', checkOut: '2023-05-28'}
    // const { data, error, loaded } = useAxios<ResponseData>({
    //     url: "http://localhost:3000/coordinates/info",
    //     method: "GET",
    //     payload: body
    // });
    // useEffect(() => {
    //     console.log(data, "data");
    // }, [data])
    // console.log(data);
    const columns = [
        {
            title: 'Square ID',
            dataIndex: 'square_id',
            sorter: (a: { square_id: number }, b: { square_id: number }) => a.square_id - b.square_id,
        },
        {
            title: 'Occupancy (%)',
            dataIndex: 'occupancy',
            sorter: (a: { occupancy: number }, b: { occupancy: number }) => a.occupancy - b.occupancy,
        },
        {
            title: 'Density',
            dataIndex: 'properties_count',
            sorter: (a: { properties_count: number }, b: { properties_count: number }) => a.properties_count - b.properties_count,
        },
        {
            title: 'Cost Per Night (€)',
            dataIndex: 'cost_per_night',
            sorter: (a: { cost_per_night: number | null }, b: { cost_per_night: number | null }) =>
                (a.cost_per_night || 0) - (b.cost_per_night || 0),
            render: (value: number | null) => value ?? '-',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            render: (url: string) => <Link href={url} target="_blank">Aribnb</Link>
        },
    ];

// Render the Table component with the columns and data
    return (
        <div className="table-container">
            {/*<Table columns={columns} dataSource={data?.data} loading={!loaded} className={'table'} />*/}
        </div>
    );
}

export default MainTable;
import {Table} from "antd";
import React from "react";

const MainTable = () => {
    const columns = [
        {
            title: 'Square ID',
            dataIndex: 'square_id',
        },
        {
            title: 'Occupancy (%)',
            dataIndex: 'occupancy',
        },
        {
            title: 'Density',
            dataIndex: 'density',
        },
        {
            title: 'Cost Per Night (€)',
            dataIndex: 'cost_per_night',
        },
    ];

    const data = [
        {
            square_id: 1,
            occupancy: 90,
            density: 40,
            cost_per_night: 56
        }
    ]


    return (
        <div className="App">
            {/*<Table columns={columns} dataSource={data} bordered />;*/}
            {/*<GroupChart data={W12BookingStatusData}/>*/}
            {/*<GroupChart data={BookingAdultStatusData}/>*/}
            <Table columns={columns} dataSource={data} />;
        </div>
    );
}

export default MainTable;
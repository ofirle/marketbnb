import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Column} from '@ant-design/plots';

const GroupChart = ({ data }: { data: any[] }) => {
    const config = {
        data,
        isGroup: true,
        xField: 'xField',
        yField: 'value',
        seriesField: 'name',

        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],

        /** 设置间距 */
        // marginRatio: 0.1,
        label: {
            position: 'middle' as const, // Specify the position as a string literal
            layout: [{
                type: 'interval-adjust-position',
            }, {
                type: 'interval-hide-overlap',
            }, {
                type: 'adjust-color',
            }],
            // formatter: (text: any) => `${text}%`, // Add a '%' suffix to the label text
        },
    };
    return <Column {...config} style={{width: '50%'}}/>;
}

export default GroupChart;
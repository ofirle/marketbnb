import React from 'react';
import {Mix} from '@ant-design/plots';
import {MixConfig} from "@ant-design/plots/es/components/mix";
import {Statistics} from "./groupChart.type";

const GroupChart = ({data, isGroup = false, averageLine = false}: {
    data: { name?: string, value: number, xField: string }[],
    isGroup?: boolean,
    averageLine?: boolean
}) => {
    // Calculate group sums and averages
    const groupSums: Statistics = {};
    let maximumValue: number = Number.MIN_SAFE_INTEGER;
    let linesAveragePlots: any[] = [];
    if (averageLine) {
        const uniqueXFields = new Set(data.map((item) => item.xField));

        for (const item of data) {
            const groupKey = item.name ?? 'average';

            if (!(groupKey in groupSums)) {
                groupSums[groupKey] = { sum: 0, count: 0 };
            }

            const { sum, count } = groupSums[groupKey];
            groupSums[groupKey] = { sum: sum + item.value, count: count + 1 };
            maximumValue = Math.max(maximumValue, item.value);
        }

        // Generate data for average line plots
        const averagesDataArray = Object.keys(groupSums).map(groupKey => {
            return {
                data: Array.from(uniqueXFields).map((xField) => {
                    const averageValue = parseFloat((groupSums[groupKey].sum / groupSums[groupKey].count).toFixed(1));
                    return { value: averageValue, xField };
                }),
                label: groupKey
            };
        });
        console.log(averagesDataArray);

        // Generate line plots for average data
        linesAveragePlots = averagesDataArray.map((item) => {
            return {
                type: 'line',
                options: {
                    data: item.data,
                    xField: 'xField',
                    yField: 'value',
                    xAxis: false,
                    lineStyle: {
                        fill: 'red',
                        fillOpacity: 0.5,
                        stroke: 'black',
                        lineWidth: 3,
                        lineDash: [4, 5],
                        strokeOpacity: 0.4,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        cursor: 'pointer'
                    },
                    yAxis: {
                        max: ((maximumValue + 25) - (maximumValue % 25)),
                    },
                    meta: {
                        value: {
                            alias: `${item.label} Average`,
                        },
                    },
                },
            };
        });
    }

// Generate configuration for Mix chart
    const config: any = {
        legend: {
            layout: 'horizontal'
        },
        appendPadding: 8,
        tooltip: {
            shared: true,
        },
        syncViewPadding: true,

        plots: [
            {
                type: 'column',

                options: {
                    isGroup: isGroup,
                    seriesField: isGroup ? 'name' : null,
                    data: data,
                    xField: 'xField',
                    yField: 'value',
                    yAxis: {
                        max: ((maximumValue + 25) - (maximumValue % 25)),
                    },
                    meta: {
                        date: {
                            sync: true,
                        },
                        value: {
                            alias: !isGroup ? 'Value' : null,
                        },
                    },
                    label: {
                        position: 'middle',
                    },
                },
            },
            ...linesAveragePlots
        ],
    };

    console.log(config);

    return <Mix {...config} style={{ height: 200 }} />;

}

export default GroupChart;
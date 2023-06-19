import {Occupancy, OccupancyData} from "./interfaces/squarePage";

const addZero = (num: number) => {
    if (num < 10) return `0${num}`;
    return num;
}
export const getFormattedDate = (stringDate: string): string => {
    const date = new Date(stringDate);
    return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export const getRoundNumber = (number: number | string): number => {
    if (typeof number === 'string') {
        number = +number;
    }

    return number % 1 === 0 ? number : Math.round(number * 100) / 100;
};


export const getSmallestDaysDiffData = (OccupancyObject: Occupancy): Occupancy => {
    const data = OccupancyObject.data;
    const reducedData: { [key: string]: OccupancyData & { key: string } } = data.reduce((acc, curr) => {
        const { checkIn, checkOut } = curr.dates;
        const key = `${checkIn}-${checkOut}`;
        const existingData = acc[key];
        if (!existingData || curr.dayDiff < existingData.dayDiff) {
            acc[key] = { ...curr, key }; // Include key property in the object
        }
        return acc;
    }, {} as { [key: string]: OccupancyData & { key: string } });
    const newOccupancies = Object.values(reducedData);

    const sum = newOccupancies.reduce((acc, obj) => acc + obj.value, 0);
    const average = sum / newOccupancies.length;
    return { data: Object.values(reducedData), average };
};


export const getOccupancyTableData = (inputObject: Occupancy) => {
    console.log(inputObject);
    const outputObject: {
        data: {
            key: string; // Added key property
            dates: { checkIn: string; checkOut: string };
            data: { dayDiff: number; value: number }[];
            average: number; // Added property for average value
        }[];
    } = {
        data: []
    };

    const groupedData: {
        [key: string]: {
            key: string; // Added key property
            dates: { checkIn: string; checkOut: string };
            data: { dayDiff: number; value: number }[];
            average: number; // Added property for average value
        };
    } = inputObject.data.reduce((acc, item) => {
        console.log(item);
        const key = `${item.dates.checkIn}_${item.dates.checkOut}`;
        if (!acc[key]) {
            acc[key] = {
                key, // Assign key property
                dates: item.dates,
                data: [],
                average: 0 // Initialize average value to 0
            };
        }
        acc[key].data.push({
            dayDiff: item.dayDiff,
            value: item.value
        });
        return acc;
    }, {} as { [key: string]: { key: string; dates: { checkIn: string; checkOut: string }; data: { dayDiff: number; value: number }[]; average: number } });

    for (const key in groupedData) {
        const group = groupedData[key];
        const sum = group.data.reduce((total, item) => total + item.value, 0);
        group.average = sum / group.data.length; // Calculate average value
        outputObject.data.push(group);
    }

    return outputObject;
};


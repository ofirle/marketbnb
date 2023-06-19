import {Table} from "antd";
import {Properties, Property} from "../../interfaces/squarePage";
import {getFormattedDate} from "../../utils";
import {ColumnsType} from "antd/es/table";
import './PropertiesTable.css'

const PropertiesTable = ({properties}: { properties: Property[] }) => {
    const columns: ColumnsType<any> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            fixed: 'left',

        },
        {
            title: 'Airbnb ID',
            dataIndex: 'airbnb_id',
            key: 'airbnb_id',
        },
        {
            title: 'Price Per Night',
            dataIndex: ['cost_per_night_weekend', 'value'],
            key: 'cost_per_night_weekend.value',
            sorter: (a: any, b: any) => a.cost_per_night_weekend.value - b.cost_per_night_weekend.value,
            render: function (value, record, index) {
                return `${value}${record?.cost_per_night_weekend?.currency || '€'}`;
            }
        },
        {
            title: 'Rating',
            children: [
                {
                    title: 'Avg.',
                    dataIndex: ['ratings', 'average'],
                    key: 'ratings.average',
                    width: 60,
                    sorter: (a: any, b: any) => (a.ratings?.average || 0) - (b.ratings?.average || 0),
                    render: (value: string) => value ?? '-',
                },
                {
                    title: 'Location',
                    dataIndex: ['ratings', 'details', 'location', 'value'],
                    key: 'ratings.details.location.value',
                    width: 90,
                    sorter: (a: any, b: any) => (a.ratings?.details?.location?.value || 0) - (b.ratings?.details?.location?.value || 0)
                },
            ]
        },
        {
            title: 'Reviews',
            children: [
                {
                    title: 'Total',
                    dataIndex: ['reviews', 'count'],
                    key: 'reviews.count',
                    width: 70,
                    sorter: (a: any, b: any) => (a.reviews?.count || 0) - (b.reviews?.count || 0),
                    render: (value: string) => value ?? 0,
                },
                {
                    title: 'First',
                    dataIndex: ['reviews', 'firstReview'],
                    key: 'reviews.firstReview',
                },
            ]
        },
        {
            title: 'Max Guests',
            dataIndex: 'guests',
            key: 'guests',
            sorter: (a: any, b: any) => a.guests - b.guests,
        },
        {
            title: 'Bedrooms',
            dataIndex: 'bedrooms',
            key: 'bedrooms',
            sorter: (a: any, b: any) => a.bedrooms - b.bedrooms,

        },
        {
            title: 'Beds',
            dataIndex: 'beds',
            key: 'beds',
            sorter: (a: any, b: any) => a.beds - b.beds,

        },
        {
            title: 'Baths',
            dataIndex: 'baths',
            key: 'baths',
            sorter: (a: any, b: any) => a.baths - b.baths,

        },
        {
            title: 'Superhost',
            dataIndex: 'superhost',
            key: 'superhost',
            render: (isSuperhost: boolean) => {
                return isSuperhost ? 'Yes' : 'No'
            }
        },
        {
            title: 'Min. Nights',
            dataIndex: 'minimum_nights',
            key: 'minimum_nights',
            sorter: (a: any, b: any) => a.min_nights - b.min_nights,
            render: (min_nights: number) => {
                return min_nights ?? '-'
            }
        },
        {
            title: 'Last Scraped',
            dataIndex: 'editedDate',
            key: 'editedDate',
            render: (editedDate: string) => editedDate  ? getFormattedDate(editedDate) : '-',
            sorter: (a: any, b: any): number => {
                const date1 = new Date(a);
                const date2 = new Date(b);
                return date1 < date2 ? 1 : -1;
            }
        },
    ];
    return <Table dataSource={properties ?? []} columns={columns} size={'small'} scroll={{x: 1300}} bordered
                  onRow={(record, rowIndex) => {
                      return {
                          onDoubleClick: (event) => window.open(record.url, '_blank')
                      }
                  }
                  }
                  rowClassName="properties-table"
                  // expandable={{
                  //     expandedRowRender: (record) => <Table dataSource={properties ?? []} columns={columns} size={'small'} scroll={{x: 1300}} bordered /> ,
                  //     rowExpandable: (record) => true,
                  // }}
    />;

}
export default PropertiesTable;
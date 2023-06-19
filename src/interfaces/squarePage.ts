export interface OccupancyData {
    dates: {
        checkIn: string;
        checkOut: string;
    };
    dayDiff: number;
    value: number;
}

export interface Occupancy {
    data: OccupancyData[];
    average: number;
}

interface RatingSingle {
    value: number,
    place?: number
}

interface RatingDetails {
    cleanliness: RatingSingle,
    communication: RatingSingle;
    checkIn: RatingSingle;
    accuracy: RatingSingle;
    location: RatingSingle;
    value: RatingSingle;
}

interface Rating {
    average: number;
    details: RatingDetails;
    place?: number
}

interface Review {
    count: number;
    firstReview: string;
}

export interface Property {
    id: number;
    airbnb_id: string;
    guests: number;
    bedrooms: number;
    beds: number;
    baths: number;
    superhost: boolean;
    ratings: Rating;
    reviews: Review;
    cost_per_night_weekend: {
        value: number;
        currency: string;
    };
    availabilityCheck: {
        data: OccupancyData
    }
    editedDate: string;
}

export interface SquareData {
    id: number;
    url: string;
        occupancy: Occupancy;
    last_scraped_date: string;
    currency: string;
    pricePerNightWeekend: {
        average: number;
        place: number;
    };
    ratings: Rating;
    properties: Properties;
}

export interface Properties {
    data: Property[],
    place: number
}
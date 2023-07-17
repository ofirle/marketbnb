export interface SquareData {
    square_id: number;
    properties_count: number;
    occupancy: number;
    cost_per_night: number | null;
    url: string;
}

export interface SquareCoordinates {
    center: {lat: number, lng: number};
    coordinates: {lat: number, lng: number}[];
    id: number
}

export interface FullInfoSquare {
    square_id?: number;
    properties_count?: number;
    occupancy?: number;
    cost_per_night?: number | null;
    url?: string;
    coordinates: {lat: number, lng: number}[];
    id: number
}
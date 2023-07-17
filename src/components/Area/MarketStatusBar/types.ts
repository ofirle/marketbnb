interface Country {
    id: number;
    key: string;
    label: string;
    icon_url: string | null;
    markets: Array<Partial<Market>>;
}

interface Market {
    id: number;
    countryId: number;
    label: string;
    icon_url: string | null;
    country: Country;
}

interface SubMarket {
    id: number;
    marketId: number;
    label: string;
    icon_url: string | null;
}

export interface IRegion {
    id: number;
    marketId: number;
    subMarketId: number;
    priority: number;
    market: Market;
    subMarket: SubMarket;
    center: PointCoordinate
    watchLists: IWatchList[]
}

export interface IWatchList {
    id: number,
    title: string,
    lat: number,
    lng: number,
    archived: boolean,
    visible: boolean
}

export type PointCoordinate = { lat: number, lng: number }
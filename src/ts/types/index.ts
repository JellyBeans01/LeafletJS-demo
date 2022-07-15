export enum Apps {
    Guide = "guide",
    PoC = "poc",
}

export enum MarkerColor {
    Green = "green",
    Red = "red",
    Orange = "orange",
}

export type UseMarkersParamsType = {
    locations: Location[];
};

export type LocationResult = {
    Municipality: string | null;
    Zipcode: string | null;
    Thoroughfarename: string | null;
    Housenumber: string | null;
    ID: number;
    Location: {
        Lat_WGS84: number;
        Lon_WGS84: number;
    };
};

export type GeocoderResponse = {
    LocationResult: LocationResult[];
};

export type Location = {
    address: {
        id: number;
        zip: string;
        city: string;
        street: string;
        houseNumber: string;
    };
    coordinates: {
        lat: number;
        lng: number;
    };
    type: MarkerColor;
};

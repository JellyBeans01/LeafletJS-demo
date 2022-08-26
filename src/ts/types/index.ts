import { Proj4GeoJSONFeature } from "proj4leaflet";
import { MarkerColor, TravelType } from "./enums";

export type Address = {
    address: {
        id: number;
        zip: string;
        city: string;
        street: string;
        houseNumber: string;
    };
};

export type UseMarkersParamsType<T> = {
    locations: Location<T>[];
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

export type Location<T> = {
    type: MarkerColor;
    coordinates: {
        lat: number;
        lng: number;
    };
    popupContent?: string;
    data: T;
};

export type TrainStation = {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
};

export type TravelTime = {
    type: TravelType;
    geo: string;
    reistijd: number;
};

export type TravelTimeData = {
    type: TravelType;
    reistijd: number;
    geometry: Proj4GeoJSONFeature;
};

export * from "./enums";

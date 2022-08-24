import axios from "axios";
import { Address, GeocoderResponse, Location } from "../types";
import endpoints from "./endpoints";
import { API_LAT, API_LNG, API_QUERY } from "./constants";
import { locationResultMissesInformation, mapLocationResultToLocation } from "./utils";

export const findLocationByLatLng = async (lat: number, lng: number): Promise<Location<Address> | null> => {
    try {
        const endpoint = endpoints.geocoder.latLng.replace(API_LAT, `${lat}`).replace(API_LNG, `${lng}`);

        const { data } = await axios.get<GeocoderResponse>(endpoint);
        if (!data.LocationResult.length) return null;

        return mapLocationResultToLocation(data.LocationResult[0]);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log("Could not fetch location", err);
        return null;
    }
};

export const findLocationByAddress = async (address: string): Promise<Location<Address> | null> => {
    try {
        const query = encodeURI(address);
        const endpoint = endpoints.geocoder.query.replace(API_QUERY, query);

        const { data } = await axios.get<GeocoderResponse>(endpoint);
        if (!data.LocationResult.length) return null;

        const locationResult = data.LocationResult[0];

        if (!locationResultMissesInformation(locationResult)) return mapLocationResultToLocation(locationResult);

        const lat = locationResult.Location.Lat_WGS84;
        const lng = locationResult.Location.Lon_WGS84;

        return await findLocationByLatLng(lat, lng);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log("Could not fetch location", err);
        return null;
    }
};

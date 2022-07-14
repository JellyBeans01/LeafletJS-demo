import Leaflet, { Marker } from "leaflet";
import { Position } from "geojson";
import { Location, LocationResult } from "../types";

export const convertLocationToMarker = (location: Location): Marker => {
    const { address, coordinates } = location;
    const { city, houseNumber, street, zip } = address;
    const { lat, lng } = coordinates;

    const html = `
            <p>${street} ${houseNumber}</p>
            <p>${zip} ${city}</p>
        `;

    return Leaflet.marker([lat, lng]).bindPopup(html);
};

export const locationResultMissesInformation = (locationResult: LocationResult): boolean => {
    const { Housenumber, Municipality, Thoroughfarename, Zipcode } = locationResult;
    return !Housenumber || !Municipality || !Thoroughfarename || !Zipcode;
};

export const mapLocationResultToLocation = (locationResult: LocationResult): Location => ({
    address: {
        city: locationResult.Municipality || "",
        houseNumber: locationResult.Housenumber || "",
        id: locationResult.ID,
        street: locationResult.Thoroughfarename || "",
        zip: locationResult.Zipcode || "",
    },
    coordinates: {
        lat: locationResult.Location.Lat_WGS84,
        lng: locationResult.Location.Lon_WGS84,
    },
});

export const createLinestringGeoJson = (coordinates: Position[]): GeoJSON.LineString => ({
    type: "LineString",
    coordinates,
});

import Leaflet, { Marker, Icon } from "leaflet";
import { Position } from "geojson";
import { Location, LocationResult, MarkerColor } from "../types";

export const convertLocationToMarker = (location: Location): Marker => {
    const { address, coordinates, type } = location;
    const { city, houseNumber, street, zip } = address;
    const { lat, lng } = coordinates;

    const html = `
        <p>${street} ${houseNumber}</p>
        <p>${zip} ${city}</p>
    `;

    const icon = generateLeafIcon(type);

    return Leaflet.marker([lat, lng]).setIcon(icon).bindPopup(html);
};

export const locationResultMissesInformation = (locationResult: LocationResult): boolean => {
    const { Housenumber, Municipality, Thoroughfarename, Zipcode } = locationResult;
    return !Housenumber || !Municipality || !Thoroughfarename || !Zipcode;
};

export const generateRandomMarkerColor = (): MarkerColor => {
    const colors = [MarkerColor.Green, MarkerColor.Red, MarkerColor.Orange];
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
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
    type: generateRandomMarkerColor(),
});

export const createLinestringGeoJson = (coordinates: Position[]): GeoJSON.LineString => ({
    type: "LineString",
    coordinates,
});

export const createMultiPolygonGeoJson = (coordinates: Position[]): GeoJSON.MultiPolygon => ({
    type: "MultiPolygon",
    coordinates: [[coordinates]],
});

export const generateLeafIcon = (iconColor: MarkerColor): Icon => {
    return Leaflet.icon({
        iconUrl: `icons/leaf-${iconColor}.png`,
        shadowUrl: "icons/leaf-shadow.png",
        iconSize: [38, 95], // size of the icon
        shadowSize: [50, 64], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62], // the same for the shadow
        popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });
};

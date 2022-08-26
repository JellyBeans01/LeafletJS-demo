import Leaflet, { Marker, Icon, GeoJSONOptions } from "leaflet";
import { Proj4GeoJSONFeature } from "proj4leaflet";
import { Location, LocationResult, MarkerColor, GeoJsonObject, Address, TrainStation, TravelType } from "../types";

export const convertLocationToMarker = <T>(location: Location<T>): Marker => {
    const { popupContent, coordinates, type } = location;
    const { lat, lng } = coordinates;

    const icon = generateLeafIcon(type);
    const marker = Leaflet.marker([lat, lng]).setIcon(icon);

    if (popupContent) marker.bindPopup(popupContent);

    return marker;
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

export const mapLocationResultToLocation = (locationResult: LocationResult): Location<Address> => ({
    type: generateRandomMarkerColor(),
    coordinates: {
        lat: locationResult.Location.Lat_WGS84,
        lng: locationResult.Location.Lon_WGS84,
    },
    popupContent: `
        <p>${locationResult.Thoroughfarename} ${locationResult.Housenumber}</p>
        <p>${locationResult.Zipcode} ${locationResult.Municipality}</p>
    `,
    data: {
        address: {
            city: locationResult.Municipality || "",
            houseNumber: locationResult.Housenumber || "",
            id: locationResult.ID,
            street: locationResult.Thoroughfarename || "",
            zip: locationResult.Zipcode || "",
        },
    },
});

export const mapTrainStationToLocation = (trainStation: TrainStation): Location<TrainStation> => ({
    type: generateRandomMarkerColor(),
    coordinates: {
        lat: +trainStation.latitude,
        lng: +trainStation.longitude,
    },
    popupContent: `<p>${trainStation.name}</p>`,
    data: trainStation,
});

export const createLinestringGeoJson = (coordinates: [number, number][]): LineString => ({
    type: GeoJsonObject.LineString,
    coordinates,
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

export const generateGeoJson = (geometry: Geometry): Proj4GeoJSONFeature => ({
    type: "Feature",
    crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:EPSG::31370" },
    },
    geometry,
    properties: {},
});

export const getStyleForTravelType = (type: TravelType): GeoJSONOptions => {
    // Thanks @ http://randomcolour.com/ :D
    switch (type) {
        case TravelType.Auto:
            return { style: { color: "#6614fb" } };

        case TravelType.EBike:
            return { style: { color: "#a845ee" } };

        case TravelType.Fiets:
            return { style: { color: "#48c28a" } };

        case TravelType.VrachtVerkeer:
            return { style: { color: "#edbd2a" } };

        case TravelType.Wandel:
            return { style: { color: "#df5b75" } };

        default:
            return { style: { color: "#bdcc2f" } };
    }
};

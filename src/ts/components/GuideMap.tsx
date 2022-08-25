import { FC, useEffect } from "react";
import Leaflet, { LeafletMouseEvent, Map } from "leaflet";
import {
    CIRCLE_DEFAULT_LAT,
    CIRCLE_DEFAULT_LNG,
    DEFAULT_LAT,
    DEFAULT_LNG,
    DEFAULT_MAX_ZOOM,
    DEFAULT_ZOOM,
    MAP_ID,
    MARKER_DEFAULT_LAT,
    MARKER_DEFAULT_LNG,
    POLYGON_DEFAULT_COORDINATES,
    POPUP_DEFAULT_LAT,
    POPUP_DEFAULT_LNG,
} from "../resources/constants";

const GuideMap: FC = () => {
    const onClickMap = (evt: LeafletMouseEvent, map: Map) => {
        Leaflet.popup()
            .setLatLng(evt.latlng)
            .setContent(`You clicked the map on these coordinates\nlat: ${evt.latlng.lat}\nlng: ${evt.latlng.lat}`)
            .openOn(map);
    };

    useEffect(() => {
        // Create the map, centered on our coordinates and using a zoom level
        const map = Leaflet.map(MAP_ID).setView([DEFAULT_LAT, DEFAULT_LNG], DEFAULT_ZOOM);

        // Create a layer that represents the map, other providers than Open Street Map may be used as well.
        // The choice is yours
        Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: DEFAULT_MAX_ZOOM,
            attribution: "© OpenStreetMap", // Attribution for copyright thingies
        }).addTo(map);

        // Create a marker, circle and polygon
        const marker = Leaflet.marker([MARKER_DEFAULT_LAT, MARKER_DEFAULT_LNG]).addTo(map);
        const circle = Leaflet.circle([CIRCLE_DEFAULT_LAT, CIRCLE_DEFAULT_LNG], {
            color: "red",
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 500,
        }).addTo(map);
        const polygon = Leaflet.polygon(POLYGON_DEFAULT_COORDINATES).addTo(map);

        // Add popups to the items
        marker.bindPopup("<b>Hello world!</b><br />I can be an HTML popup!");
        circle.bindPopup("I am a circle");

        // Add a tooltip instead of a popup
        polygon.bindTooltip("I am a tooltip!");

        // Add a standalone popup
        Leaflet.popup()
            .setLatLng([POPUP_DEFAULT_LAT, POPUP_DEFAULT_LNG])
            .setContent("I am a standalone popup.")
            .openOn(map);

        // Add event listener on map
        map.on("click", (evt) => onClickMap(evt, map));

        return () => {
            map.off(); // Remove all listeners from the map
            map.remove(); // Remove the map itself
        };
    }, []);

    return <div id={MAP_ID} style={{ height: 600, width: "100vw" }} />;
};

export default GuideMap;

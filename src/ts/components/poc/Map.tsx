import { FC, useEffect, useMemo, useState } from "react";
import Leaflet, { geoJSON, LatLng, Marker } from "leaflet";
import { MAP_ID } from "../../resources/constants";
import { PoCConfig } from "./Poc";
import { createLinestringGeoJson } from "../../resources/utils";

type PropsType = Omit<PoCConfig, "locations"> & {
    markers: Marker[];
    lineStringCoordinates?: [number, number][];
    multiPolygonCoordinates?: [number, number][];
    onPositionClicked?: (coordinates: LatLng) => void;
};
const Map: FC<PropsType> = (props) => {
    const { mapOptions, markers, lineStringCoordinates, onPositionClicked } = props;

    const [leafletMap, setLeafletMap] = useState<Leaflet.Map | null>(null);

    const addMarkersToMap = (markerPoints: Marker[], map = leafletMap): void => {
        if (!map) return;
        markerPoints.forEach((marker) => marker.addTo(map));
    };

    useEffect(() => {
        const map = Leaflet.map(MAP_ID)
            .setView([mapOptions.center.lat, mapOptions.center.lng], mapOptions.zoom)
            .addLayer(
                Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap",
                }),
            )
            .addLayer(geoJSON(createLinestringGeoJson(lineStringCoordinates || [])));

        addMarkersToMap(markers, map); // Add initial markers
        setLeafletMap(map);

        // Listeners
        map.on("click", (evt) => onPositionClicked?.(evt.latlng));

        return () => {
            map.off();
            map.remove();

            setLeafletMap(null);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!leafletMap) return;
        addMarkersToMap(markers, leafletMap);
    }, [markers]); // eslint-disable-line react-hooks/exhaustive-deps

    return useMemo(() => <div id={MAP_ID} style={{ height: "75vh" }} />, [markers]); // eslint-disable-line react-hooks/exhaustive-deps
};

export default Map;

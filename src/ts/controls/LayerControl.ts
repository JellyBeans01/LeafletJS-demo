import Leaflet, { GeoJSON, Map } from "leaflet";
import { TravelTimeData } from "../types";
import { getStyleForTravelType } from "../resources/utils";

const LayerControl = (map: Map, travelTimeData: TravelTimeData[]) => {
    const overlays = travelTimeData
        .sort((a, b) => a.reistijd - b.reistijd)
        .reduce<Record<string, GeoJSON>>((acc, curr) => {
            const { geometry, type, reistijd } = curr;

            const group = Leaflet.Proj.geoJson(geometry, getStyleForTravelType(type));
            map.addLayer(group);

            return {
                ...acc,
                [`${type} (${reistijd}')`]: group,
            };
        }, {});

    return Leaflet.control.layers({}, overlays).addTo(map);
};

export default LayerControl;

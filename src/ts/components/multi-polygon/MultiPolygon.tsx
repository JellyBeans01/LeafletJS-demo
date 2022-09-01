import { FC, useEffect, useMemo } from "react";
import Leaflet from "leaflet";
import proj4 from "proj4";
import "proj4leaflet";
import wicket from "wicket";
import { EPSG31370, LINESTRING, MAP_ID, POLYGON, TRAIN_STATIONS, TRAVEL_TIMES } from "../../resources/constants";
import { generateGeoJson, mapTrainStationToLocation } from "../../resources/utils";
import useMarkers from "../../hooks/useMarkers";
import { Location, TrainStation, TravelTimeData } from "../../types";
import ScreenShotControl from "../../controls/ScreenShotControl";
import LayerControl from "../../controls/LayerControl";

const MultiPolygon: FC = () => {
    const { polygon, lineString, travelTimeData, locations } = useMemo(() => {
        return {
            polygon: generateGeoJson(new wicket.Wkt(POLYGON).toJson()),
            lineString: generateGeoJson(new wicket.Wkt(LINESTRING).toJson()),
            travelTimeData: TRAVEL_TIMES.map<TravelTimeData | null>(({ type, geo, reistijd }) => {
                const strippedProjection = geo.replace("SRID=31370;", "");
                if (strippedProjection.includes("GEOMETRYCOLLECTION")) return null;

                return {
                    type,
                    reistijd,
                    geometry: generateGeoJson(new wicket.Wkt(strippedProjection).toJson()),
                };
            }).filter(Boolean) as TravelTimeData[],
            locations: TRAIN_STATIONS.map<Location<TrainStation>>(mapTrainStationToLocation),
        };
    }, []);

    const { markers } = useMarkers({ locations });

    useEffect(() => {
        // Since we use the proj4leaflet plugin, we only need to register the projection as the plugin handles the rest
        // Not much documentation is available on how this really works tho...
        proj4.defs("EPSG:31370", EPSG31370);

        const OSM = Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        });

        const map = Leaflet.map(MAP_ID).setView([50.716841, 4.204606], 15).addLayer(OSM);

        // Since out polygons use projected coordinates, we need to project them on our map as well
        Leaflet.Proj.geoJson(lineString, { style: { color: "red", weight: 10 } }).addTo(map);
        Leaflet.Proj.geoJson(polygon).addTo(map);

        // We can add normal coordinates directly to our map, without the need of projecting them
        markers.forEach((marker) => marker.addTo(map));

        map.addControl(new ScreenShotControl());
        map.addControl(LayerControl(map, travelTimeData));

        return () => {
            map.off();
            map.remove();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return useMemo(() => <div id={MAP_ID} style={{ height: "90vh" }} />, []);
};

export default MultiPolygon;

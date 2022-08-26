import { FC, useEffect, useMemo } from "react";
import Leaflet from "leaflet";
import "proj4leaflet";
import wicket from "wicket";
import { EPSG31370, LINESTRING, MAP_ID, POLYGON, TRAIN_STATIONS, TRAVEL_TIMES } from "../../resources/constants";
import { generateGeoJson, mapTrainStationToLocation } from "../../resources/utils";
import useMarkers from "../../hooks/useMarkers";
import { Location, TrainStation, TravelTimeData } from "../../types";
import ScreenShotControl from "../../controls/ScreenShotControl";
import LayerControl from "../../controls/LayerControl";

const MultiPolygon: FC = () => {
    const { polygon, lineString, travelTimData, locations } = useMemo(() => {
        return {
            polygon: generateGeoJson(new wicket.Wkt(POLYGON).toJson()),
            lineString: generateGeoJson(new wicket.Wkt(LINESTRING).toJson()),
            travelTimData: TRAVEL_TIMES.map<TravelTimeData | null>(({ type, geo, reistijd }) => {
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
        const projection = {
            epsg: "EPSG:31370",
            def: EPSG31370,
            resolutions: [
                1112.61305859375, 556.306529296875, 278.1532646484375, 139.07663232421876, 69.53831616210938,
                34.76915808105469, 17.384579040527345, 8.692289520263673, 4.346144760131836, 2.173072380065918,
                1.086536190032959, 0.5432680950164795, 0.2716340475082398, 0.1358170237541199, 0.0679085118770599,
                0.03395425593853,
            ],
        };

        // Create the projection in EPSG:31370 so that the polygons can be applied correctly without transforming them all individually
        const crs = new Leaflet.Proj.CRS(projection.epsg, projection.def, { resolutions: projection.resolutions });

        const map = Leaflet.map(MAP_ID, { crs })
            .setView([50.719841, 4.204606], 8)
            .addLayer(
                Leaflet.tileLayer.wms("https://ows.mundialis.de/services/service?", {
                    layers: "OSM-WMS", // Other layers: https://leafletjs.com/examples/wms/wms.html
                    attribution: "Mundalis: https://www.mundialis.de/en/",
                    crs: Leaflet.CRS.EPSG3857, // Use the default EPSG:3857 projection used by Leaflet, so the map tiles will be fetched correctly
                }),
            );

        // Since out polygons use projected coordinates, we need to project them on our map as well
        Leaflet.Proj.geoJson(lineString, { style: { color: "red" } }).addTo(map);
        Leaflet.Proj.geoJson(polygon).addTo(map);

        // We can add normal coordinates directly to our map, without the need of projecting them
        markers.forEach((marker) => marker.addTo(map));

        map.addControl(new ScreenShotControl());
        map.addControl(LayerControl(map, travelTimData));

        return () => {
            map.off();
            map.remove();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return useMemo(() => <div id={MAP_ID} style={{ height: "90vh" }} />, []);
};

export default MultiPolygon;

import { FC, useEffect, useMemo } from "react";
import Leaflet from "leaflet";
import "proj4leaflet";
import wicket from "wicket";
import { EPSG31370, LINESTRING, MAP_ID, POLYGON, TRAIN_STATIONS } from "../../resources/constants";
import { generateGeoJson, mapTrainStationToLocation } from "../../resources/utils";
import useMarkers from "../../hooks/useMarkers";
import { Location, TrainStation } from "../../types";
import ScreenShotControl from "../../controls/ScreenShotControl";

const MultiPolygon: FC = () => {
    const { polygon, lineString, locations } = useMemo(() => {
        return {
            polygon: new wicket.Wkt(POLYGON).toJson(),
            lineString: new wicket.Wkt(LINESTRING).toJson(),
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

        const crs = new Leaflet.Proj.CRS(projection.epsg, projection.def, { resolutions: projection.resolutions });

        const map = Leaflet.map(MAP_ID, { crs })
            .setView([50.719841, 4.204606], 8)
            .addLayer(
                Leaflet.tileLayer.wms("https://ows.mundialis.de/services/service?", {
                    layers: "OSM-WMS", // Other layers: https://leafletjs.com/examples/wms/wms.html
                    attribution: "Mundalis: https://www.mundialis.de/en/",
                    crs: Leaflet.CRS.EPSG3857,
                }),
            );

        Leaflet.Proj.geoJson(generateGeoJson(lineString), { style: { color: "red" } }).addTo(map);
        Leaflet.Proj.geoJson(generateGeoJson(polygon)).addTo(map);

        markers.forEach((marker) => marker.addTo(map));

        map.addControl(new ScreenShotControl());

        return () => {
            map.off();
            map.remove();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return useMemo(() => <div id={MAP_ID} style={{ height: "90vh" }} />, []);
};

export default MultiPolygon;

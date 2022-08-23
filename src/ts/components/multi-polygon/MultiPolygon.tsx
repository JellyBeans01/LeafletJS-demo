import { FC, useEffect, useMemo } from "react";
import Leaflet from "leaflet";
import "proj4leaflet";
import wicket from "wicket";
import { DEFAULT_LAT, DEFAULT_LNG, EPSG31370, LINESTRING, MAP_ID, POLYGON } from "../../resources/constants";
import { generateLineStringGeoJson } from "../../resources/utils";

const MultiPolygon: FC = () => {
    const { polygon, lineString } = useMemo(() => {
        return { polygon: new wicket.Wkt(POLYGON).toJson(), lineString: new wicket.Wkt(LINESTRING).toJson() };
    }, []);

    useEffect(() => {
        console.count("render");
        console.log(polygon, lineString);

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
            .setView([DEFAULT_LAT, DEFAULT_LNG], 12)
            .addLayer(
                Leaflet.tileLayer.wms("https://geoservices.informatievlaanderen.be/raadpleegdiensten/histcart/wms", {
                    format: "image/png",
                    attribution: "Source: GIS Geoservices Informatie Vlaanderen",
                }),
            );

        try {
            Leaflet.Proj.geoJson(generateLineStringGeoJson(lineString as LineString)).addTo(map);
        } catch (e) {
            console.error(e);
        }

        return () => {
            map.off();
            map.remove();

            console.log("cleanup");
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return useMemo(() => <div id={MAP_ID} style={{ height: "90vh" }} />, []);
};

export default MultiPolygon;

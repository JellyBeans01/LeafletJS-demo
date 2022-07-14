import { LatLngExpression } from "leaflet";
import { PoCConfig } from "../components/poc/Poc";

export const MAP_ID = "map";

/* --- Constants regarding the Leaflet guide ------------------------------------------------------------------------ */

export const DEFAULT_LAT = 51.0489333;
export const DEFAULT_LNG = 3.6863573;
export const DEFAULT_ZOOM = 12;
export const DEFAULT_MAX_ZOOM = 19;

export const MARKER_DEFAULT_LAT = 51.0489333;
export const MARKER_DEFAULT_LNG = 3.6863573;

export const CIRCLE_DEFAULT_LAT = 51.0269944;
export const CIRCLE_DEFAULT_LNG = 3.6988123;

export const POLYGON_DEFAULT_COORDINATES: LatLngExpression[] = [
    [51.0269944, 3.6988123],
    [51.0290001, 3.6700001],
    [51.0369944, 3.7088123],
];

export const POPUP_DEFAULT_LAT = 51.0009333;
export const POPUP_DEFAULT_LNG = 3.7063573;

/* --- Constants regarding the Leaflet PoC -------------------------------------------------------------------------- */

export const API_LAT = "{lat}";
export const API_LNG = "{lng}";
export const API_QUERY = "{query}";

export const examplePropsPoc: PoCConfig = {
    mapOptions: {
        center: {
            lat: DEFAULT_LAT,
            lng: DEFAULT_LNG,
        },
        zoom: DEFAULT_ZOOM,
    },
    locations: [],
};

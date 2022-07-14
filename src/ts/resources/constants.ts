import { LatLngExpression } from "leaflet";
import { Position } from "geojson";
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

export const multiPolygonCoordinates = [
    [
        [158740.26, 214606.272],
        [158720.156, 214674.1751],
        [158718.3588, 214679.2009],
        [158733.7949, 214683.263],
        [158754.1056, 214688.5438],
        [158780.1034, 214695.8557],
        [158808.1322, 214703.5737],
        [158838.1921, 214712.5105],
        [158870.2831, 214721.8534],
        [158889.7814, 214728.3528],
        [158895.4684, 214731.1963],
        [158919.435, 214742.9766],
        [158938.5271, 214754.3506],
        [158941.682, 214749.452],
        [158968.7139, 214722.156],
        [158969.96, 214725.833],
        [158994.052, 214688.504],
        [158974.744, 214666.6071],
        [158948.3519, 214582.719],
        [158929.564, 214523.0019],
        [158906.2179, 214526.435],
        [158902.345, 214526.2921],
        [158873.145, 214525.211],
        [158842.891, 214524.092],
        [158841.404, 214532.4791],
        [158754.246, 214528.813],
        [158751.643, 214606.573],
        [158740.26, 214606.272],
    ],
];

export const linestringCoordinates: Position[] = [
    [3.716383, 51.0583364],
    [3.7251377, 51.0610876],
    [3.7329912, 51.0604403],
    [3.7344503, 51.0577699],
    [3.7344074, 51.0551804],
    [3.7292147, 51.0547488],
    [3.729043, 51.0531032],
    [3.7289143, 51.0507562],
    [3.7253523, 51.0501627],
    [3.7192583, 51.0496501],
    [3.7176704, 51.0524018],
    [3.7093878, 51.0534],
    [3.7126064, 51.0555041],
    [3.7105465, 51.0587679],
    [3.713336, 51.0611146],
    [3.7142801, 51.0582824],
    [3.7163401, 51.0584173],
];

/* --- wicket ------------------------------------------------------------------------------------------------------- */

type WktRegexes = {
    comma: string;
    coord: string;
    crudeJson: string;
    doubleparenComma: string;
    numeric: string;
    ogcTypes: string;
    parenComma: string;
    spaces: string;
    typeStr: string;
};

type LineString = {
    type: import("./src/ts/types/enums").GeoJsonObject.LineString;
    coordinates: [number, number][];
};

type Polygon = {
    type: import("./src/ts/types/enums").GeoJsonObject.Polygon;
    coordinates: [number, number][][];
};

type MultiPolygon = {
    type: import("./src/ts/types/enums").GeoJsonObject.MultiPolygon;
    coordinates: [number, number][][][];
};

type Geometry = LineString | Polygon | MultiPolygon;

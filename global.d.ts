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

declare namespace wicket {
    class Wkt {
        declare delimiter: string;
        declare wrapVertices: boolean;
        declare components: { x: number; y: number }[] | undefined;
        declare regExes: WktRegexes;

        constructor();
        constructor(geoString: string);

        declare _stripWhitespacesAndParens: (fullStr: string) => string;
        declare read: (geoString: string) => void;
        declare write: () => string;
        declare merge: (wkt: Wkt) => void;
        declare toJson: () => Geometry;
    }
}

declare module "wicket" {
    export = wicket;
}

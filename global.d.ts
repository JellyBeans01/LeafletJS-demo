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

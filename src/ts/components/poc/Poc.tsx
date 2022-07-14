import { FC } from "react";
import { Location, UseMarkersParamsType } from "../../types";
import Map from "./Map";
import Geocoder from "./Geocoder";
import useMarkers from "../hooks/useMarkers";

export type PoCConfig = {
    mapOptions: {
        center: {
            lat: number;
            lng: number;
        };
        zoom: number;
    };
    locations: Location[];
};

const Poc: FC<PoCConfig> = (props) => {
    const { locations, mapOptions } = props;

    const params: UseMarkersParamsType = {
        locations,
    };

    const { markers, addMarker } = useMarkers(params);

    return (
        <>
            <Map mapOptions={mapOptions} markers={markers} />
            <Geocoder onLocationFound={addMarker} />
        </>
    );
};

export default Poc;

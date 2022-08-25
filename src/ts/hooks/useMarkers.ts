import { Marker } from "leaflet";
import { useMemo, useState } from "react";
import { Location, UseMarkersParamsType } from "../types";
import { convertLocationToMarker } from "../resources/utils";

type UseMarkersReturnType<T> = {
    markers: Marker[];
    addMarker: (location: Location<T>) => void;
};

const useMarkers = <T>(params: UseMarkersParamsType<T>): UseMarkersReturnType<T> => {
    const { locations } = params;

    const initialMarkers = useMemo<Marker[]>(() => locations.map(convertLocationToMarker), [locations]);

    const [markers, setMarkers] = useState<Marker[]>(initialMarkers);

    const addMarker = (location: Location<T>): void => {
        const marker = convertLocationToMarker(location);
        setMarkers([...markers, marker]);
    };

    return {
        markers,
        addMarker,
    };
};

export default useMarkers;

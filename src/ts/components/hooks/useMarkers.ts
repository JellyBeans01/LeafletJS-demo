import { Marker } from "leaflet";
import { useMemo, useState } from "react";
import { Location, UseMarkersParamsType } from "../../types";
import { convertLocationToMarker } from "../../resources/utils";

type UseMarkersReturnType = {
    markers: Marker[];
    addMarker: (location: Location) => void;
};

const useMarkers = (params: UseMarkersParamsType): UseMarkersReturnType => {
    const { locations } = params;

    const initialMarkers = useMemo<Marker[]>(() => locations.map(convertLocationToMarker), [locations]);

    const [markers, setMarkers] = useState<Marker[]>(initialMarkers);

    const addMarker = (location: Location): void => {
        const marker = convertLocationToMarker(location);
        setMarkers([...markers, marker]);
    };

    return {
        markers,
        addMarker,
    };
};

export default useMarkers;

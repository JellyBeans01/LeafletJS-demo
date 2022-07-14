import { FC, useState } from "react";
import { LatLng } from "leaflet";
import { Location, UseMarkersParamsType } from "../../types";
import Map from "./Map";
import GeocoderAddress from "./GeocoderAddress";
import useMarkers from "../hooks/useMarkers";
import { findLocationByLatLng } from "../../resources/geocoder";

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
    const [error, setError] = useState<string | null>(null);

    const params: UseMarkersParamsType = {
        locations,
    };

    const { markers, addMarker } = useMarkers(params);

    const addMarkerOnClickMap = async (latLng: LatLng): Promise<void> => {
        try {
            const { lat, lng } = latLng;

            const location = await findLocationByLatLng(lat, lng);
            if (!location) {
                setError("Could not find the location information");
                return;
            }

            addMarker(location);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Error fetching location", err);
            setError("Looks like something went wrong whilst trying to get the location information");
        }
    };

    return (
        <>
            <Map mapOptions={mapOptions} markers={markers} onPositionClicked={addMarkerOnClickMap} />
            {error && <span style={{ color: "red" }}>{error}</span>}
            <GeocoderAddress onLocationFound={addMarker} />
        </>
    );
};

export default Poc;

import { FC, FormEvent, useState } from "react";
import axios from "axios";
import { GeocoderResponse, Location } from "../../types";
import endpoints from "../../resources/endpoints";
import { API_LAT, API_LNG, API_QUERY } from "../../resources/constants";
import { locationResultMissesInformation, mapLocationResultToLocation } from "../../resources/utils";

type PropsType = {
    onLocationFound: (location: Location) => void;
};
const Geocoder: FC<PropsType> = (props) => {
    const { onLocationFound } = props;

    const [address, setAddress] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const onFormSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            evt.preventDefault();
            if (!address) return;

            if (error) setError(null);
            setIsLoading(true);

            const query = encodeURI(address);
            const { data } = await axios.get<GeocoderResponse>(endpoints.geocoder.query.replace(API_QUERY, query));
            if (!data.LocationResult.length) {
                setError("Address could not be found...");
                return;
            }

            let locationResult = data.LocationResult[0];

            if (locationResultMissesInformation(locationResult)) {
                const lat = locationResult.Location.Lat_WGS84;
                const lng = locationResult.Location.Lon_WGS84;

                const { data: updatedData } = await axios.get<GeocoderResponse>(
                    endpoints.geocoder.latLng.replace(API_LAT, `${lat}`).replace(API_LNG, `${lng}`),
                );

                if (!updatedData.LocationResult.length) {
                    setError("Address could not be found...");
                    return;
                }

                // eslint-disable-next-line prefer-destructuring
                locationResult = updatedData.LocationResult[0];
            }

            setAddress("");
            setError(null);
            onLocationFound(mapLocationResultToLocation(locationResult));
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            setError("Error whilst trying to fetch location!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div style={{ margin: "20px 0" }}>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor="address">Locatie: </label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(evt) => setAddress(evt.target.value)}
                    disabled={isLoading}
                />
                <div>{error && <span style={{ color: "red" }}>{error}</span>}</div>
            </div>
            <div>
                <button type="submit" disabled={isLoading}>
                    Search Location
                </button>
            </div>
        </form>
    );
};

export default Geocoder;

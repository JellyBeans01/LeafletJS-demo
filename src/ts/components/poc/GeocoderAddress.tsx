import { FC, FormEvent, useState } from "react";
import { Location } from "../../types";
import { findLocationByAddress } from "../../resources/geocoder";

type PropsType = { onLocationFound: (location: Location) => void };
const GeocoderAddress: FC<PropsType> = (props) => {
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

            const location = await findLocationByAddress(address);
            if (!location) {
                setError("Could not find your location");
                return;
            }

            setAddress("");
            setError(null);
            onLocationFound(location);
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

export default GeocoderAddress;

import { API_LAT, API_LNG, API_QUERY } from "./constants";

const endpoints = Object.freeze({
    geocoder: {
        query: `https://loc.geopunt.be/v4/Location?q=${API_QUERY}`,
        latLng: `https://loc.geopunt.be/v4/Location?latlon=${API_LAT},${API_LNG}`,
    },
});

export default endpoints;

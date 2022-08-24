import Leaflet, { Map } from "leaflet";

const ScreenShotControl = Leaflet.Control.extend({
    options: { position: "topleft" },
    onAdd: (map: Map) => {
        const button = Leaflet.DomUtil.create("button");

        button.type = "button";
        button.style.cursor = "pointer";
        button.textContent = "Generate screenshot";
        button.onclick = () => null;

        return button;
    },
});

export default ScreenShotControl;

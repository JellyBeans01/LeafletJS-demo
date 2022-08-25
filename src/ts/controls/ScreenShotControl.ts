import Leaflet from "leaflet";
import domToImage from "dom-to-image";

const ScreenShotControl = Leaflet.Control.extend({
    options: { position: "topleft" },
    onAdd: () => {
        // Use DomUtil to let leaflet handle creation and placement itself
        const div = Leaflet.DomUtil.create("div", "leaflet-bar leaflet-control");
        const button = Leaflet.DomUtil.create("a", "screenshot-img");
        const img = Leaflet.DomUtil.create("img", "img");

        img.src = "/icons/screenshot.png";

        button.href = "#";
        button.onclick = async () => {
            const container = document.getElementById("map");
            if (!container) return;

            // First child is the map div with all it's layers, other children are controls, which we do not want on our screenshot
            // .toPng generates a base64 encoded string that contains the image in PNG format
            const dataUrl = await domToImage.toPng(container.children[0]);

            const link = document.createElement("a");
            link.href = dataUrl;
            link.download = "screenshot.png";

            link.click();
            link.remove();
        };

        button.appendChild(img);
        div.appendChild(button);

        return div;
    },
});

export default ScreenShotControl;

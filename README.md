# LeafletJS-demo

Small PoC regarding LeafletJS

## What is LeafletJS

Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. 
Weighing just about 42 KB of JS, it has all the mapping features most developers ever need.

These features include:
- Layers (Tile Layers, Markers + Popups, Vector Layers, Image Overlays, GeoJSON)
- Customization features (Pure CSS popups + controls, image + HTML based markers, ...)
- Map Controls (Zoom, scale, layer switcher, ...)
- Interaction Features (Drag panning w/ Inertia, scroll wheel zoom, pinch-zoom on mobile, keyboard navigation, ...)
- Performance Features (Hardware acceleration on mobile, smart polyline/polygon rendering, ...)
- Visual Features (Zoom + pan animation, Tile + popup fade animation, ...)

If there is a feature that is not yet supported out of the box, you can check [this page](https://leafletjs.com/plugins.html)
to see if there is a plugin for it.

Leaflet is designed with simplicity, performance and usability in mind. It works efficiently across all major desktop 
and mobile platforms

## Google Maps, other providers/wrappers

### Google Maps

- Offers many useful services (geolocation, traffic, transit, ...), Leaflet does not offer this on its own, but uses
third-party services. It is harder to implement using Leaflet
- GM does not charge for services at low usage levels, but kicks in above a certain number of requests per day
- If you need specific traffic and/or transit data of unpopular, not well known locations, GM is your best option.
- GM documentation is really expanded with a lot of implementations for different platforms, which makes it harder to
find a certain solution to a problem
- Google forces users to use the default Google base layer

- Both GM and Leaflet are fast and responsive

### OpenLayers

[OpenLayers](https://openlayers.org/) is a powerful open-source JavaScript library for dynamic maps. It provides a rich
API which allows creating simple as well as very complex map applications. The same as Leaflet, it's free to use and 
distributed under the BSD 2-Clause license.

- The OpenLayers offers more functionality than Leaflet and requires more time to start. For example, you need to use 
projections, just to create a simple map.
- Uses LonLat instead of LatLon
- The documentation contains QuickStart's, tutorials and a lot of examples. But, unfortunately, some of them already outdated.
- Smaller community
- The power and flexibility are the two most strong characteristics of OpenLayers. The library has all the required 
features out of the box.

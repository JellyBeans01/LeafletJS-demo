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

## Getting Started

Add the Leaflet package by running

```shell
pnpm add leaflet
```

I'm using pnpm, but you can use the package manager you like.

If you are using TypeScript, you will need to add the types yourself by running

```shell
pnpm add -D @types/leaflet
```

Inside your index.html file, add the following stylesheet inside your head-tag

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
```

This stylesheet is responsible for the correct arrangement of stuff inside your map-div.

### Creating a map

First off, we need to create a div element with and id and a defined height.

```jsx
<div id={MAP_ID} style={{ height: 200 }} />
```

This id can be anything you want. Important is to know what id you use as we will need it later when we inject our map.

A map can be created as follows. Use your own values for the constants defined in this example

```tsx
const map = L.map(MAP_ID).setView([DEFAULT_LAT, DEFAULT_LNG], DEFAULT_ZOOM);
```

When you are running a hot-module reloader, make sure you remove all listeners from the map, followed by removing the map
itself. Otherwise, you will get an error saying that the map container was already initialized.

#### Tile layer

Next, we’ll add a tile layer to add to our map, in this case it’s a OpenStreetMap tile layer. Creating a tile layer 
usually involves setting the URL template for the tile images, the attribution text, and the maximum zoom level of the
layer. OpenStreetMap tiles are fine for programming your Leaflet map, but read the [Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/)
of OpenStreetMap if you’re going to use the tiles in production.

```tsx
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
}).addTo(map);
```

Whenever using anything based on OpenStreetMap, an attribution is obligatory as per the copyright notice. Most other 
tile providers (such as Mapbox, Stamen or Thunderforest) require an attribution as well. Make sure to give credit where 
credit is due.


### Markers, circles and polygons

Besides tile layers, you can easily add other things to your map, including markers, polylines, polygons, circles, and 
popups.

```tsx
const marker = L.marker([51.5, -0.09]).addTo(map);
```

Adding a circle is the same (except for specifying the radius in meters as a second argument), but lets you control how
it looks by passing options as the last argument when creating the object.

```tsx
const circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);
```

Adding a polygon is as easy.

```tsx
const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);
```

### Popups

Popups are usually used when you want to attach some information to a particular object on a map. Leaflet has a very
handy shortcut for this.

```tsx
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
```

You can also use popups as layers (when you need something more than attaching a popup to an object)

```tsx
const popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);
```

Here we use `openOn` instead of `addTo` because it handles automatic closing of a previously opened popup when opening a
new one which is good for usability.

### Events

Every time something happens in Leaflet, e.g. user clicks on a marker or map zoom changes, the corresponding object 
sends an event which you can subscribe to with a function. It allows you to react to user interaction.

```tsx
const onClickMap = (evt: LeafletMouseEvent): void => {
    popup
        .setLatLng(evt.latlng)
        .setContent("You clicked the map at " + evt.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
```

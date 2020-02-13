<style lang="scss">
    .map { height: 100%; width: 100%; }
</style>
<template>
    <div>
        <div id="map" class="map position-fixed"></div>
    </div>
</template>

<script>
import L from 'leaflet';

function xy(x, y) {
    const yx = L.latLng;

    if (L.Util.isArray(x)) {
        return yx(x[1], x[0]);
    }

    return yx(-y, x);
}

export default {
    name: 'map-map',
    data() {
        return {
            map: null,
            markers: null,
            imageurl: '/images/mapL.png',
        };
    },
    computed: {
        southWest() { return this.map.unproject([0, 1080], 1); },
        northEast() { return this.map.unproject([1920, 0], 1); },
        bounds() { return new L.LatLngBounds(this.southWest, this.northEast); },
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map('map', {
                minZoom: 1, maxZoom: 5, zoom: 3, crs: L.CRS.Simple,
            });
            L.imageOverlay(this.imageurl, this.bounds).addTo(this.map);
            this.map.fitBounds(this.bounds);
            this.map.setMaxBounds(this.bounds);
            this.markers = L.layerGroup();
            this.map.addLayer(this.markers);

            this.updateMarkers();
        },
        updateMarkers() {
            this.markers.clearLayers();

            if (!this.object) {
                this.objects.map(
                    // eslint-disable-next-line max-len
                    object => this.placeMarker(object.timestamps[0].x, object.timestamps[0].y, (`${object.type } ${ object.name}`)),
                );
            } else {
                this.object.timestamps.map(
                    timestamp => this.placeMarker(timestamp.x, timestamp.y, timestamp.timestamp, timestamp.current),
                );

                const locations = [];
                for (let i = 0; i < this.object.timestamps.length; i++) {
                    locations.push(xy(this.object.timestamps[i].x, this.object.timestamps[i].y));
                }

                this.markers.addLayer(L.polyline(locations).addTo(this.map));
            }
        },
        placeMarker(x, y, popup, current = true) {
            const CurrentMarker = L.icon({
                iconUrl: 'images/marker/CurrentMarker.png',

                iconSize: [49.4, 50],
                iconAnchor: [17.3, 49],
                popupAnchor: [1, -41],
            });
            const HistoryMarker = L.icon({
                iconUrl: 'images/marker/HistoryMarker.png',

                iconSize: [43.4, 50],
                iconAnchor: [11, 49],
                popupAnchor: [1, -46],
            });
            if (current) {
                this.markers.addLayer(L.marker(xy(x, y),
                { icon: CurrentMarker }).addTo(this.map).bindPopup(popup));
            } else {
                this.markers.addLayer(L.marker(xy(x, y),
                { icon: HistoryMarker }).addTo(this.map).bindPopup(popup));
            }
        },
    },
    watch: {
        object() {
            this.updateMarkers();
        },
    },
    props: {
        tracking: {
            default: false,
        },
        objects: {
            default: null,
        },
        object: {
            default: null,
        },
    },
};
</script>

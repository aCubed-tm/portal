<style lang="scss">
    .map { height: 100%; width: 100%; }
</style>
<template>
    <div>
        <div id="map" class="map position-fixed"></div>
    </div>
</template>
<script>  /* eslint-disable */ </script>
<script>
import L from 'leaflet';
import TrackingAPI from '@/services/API/TrackingAPI';

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
        imageurl: '/images/mapXL.png',
      };
    },
    computed: {
        southWest() { return this.map.unproject([0, 1367], 1); },
        northEast() { return this.map.unproject([1920, 0], 1); },
        bounds() { return new L.LatLngBounds(this.southWest, this.northEast); },
    },
    mounted() {
        this.initMap();
    },
    methods: {
        initMap() {
            this.map = L.map('map', {
                minZoom: 1, maxZoom: 3, zoom: 3, crs: L.CRS.Simple, nowrap: true,
            });
            L.imageOverlay(this.imageurl, this.bounds).addTo(this.map);
            this.map.fitBounds(this.bounds);
            this.map.setMaxBounds(this.bounds);
            this.markers = L.layerGroup();
            this.map.addLayer(this.markers);

            this.updateMarkers();
        },

        rcX(x) {
          return 1300;
          // return (x + 1285);
        },

        rcY(y) {
          return 1500;
          // return (y + 648 - 968);
        },

        updateMarkers() {
            this.markers.clearLayers();

            if (!this.object) {
                this.objects.map(
                    object => this.placeMarker(this.rcX(object.lastLocation.x),
                      this.rcY(object.lastLocation.y), (object.name)),
                );
            } else {
              TrackingAPI.getObjectHistoryByUuid({ uuid: this.object.uuid })
                .then(response => {
                  const { error, data } = response.data;
                  if (error) throw new Error(error.message || 'Unknown error.');

                  const history = data;

                  history.map(
                      l => this.placeMarker(l.x, l.y, l.time, this.object.lastLocation.x),
                  );

                  const locations = [];
                  for (let i = 0; i < history.length; i++) {
                      locations.push(xy(history[i].x, history[i].y));
                  }

                  this.markers.addLayer(L.polyline(locations).addTo(this.map));
                });
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
        objects: {
          handler() {
            this.updateMarkers();
          },
          deep: true,
        },
        object: {
          handler() {
            this.updateMarkers();
          },
          deep: true,
        },
    },
    props: {
        objects: {
            default: null,
        },
        object: {
            default: null,
        },
    },
};
</script>

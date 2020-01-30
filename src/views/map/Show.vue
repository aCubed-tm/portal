<style lang="scss">
@import '@/assets/styles/main-light';

.map { height: 100vh; }

</style>

<template>
    <div class="position-relative">
        <div id="map" class="map"></div>
        <div class="content position-fixed">
            <search />
            <result/>
        </div>
    </div>
</template>

<script>
import L from 'leaflet';
import Search from './partials/Search.vue';
import Result from './partials/Results.vue';

export default {
    name: 'map-show',
    components: { Search, Result },
    data() {
        return {
            map: null,
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
                minZoom: 1, maxZoom: 5, center: [0, 0], zoom: 3, crs: L.CRS.Simple,
            });
            L.imageOverlay(this.imageurl, this.bounds).addTo(this.map);
            this.map.fitBounds(this.bounds);
            this.map.setMaxBounds(this.bounds);
        },
    },
};
</script>

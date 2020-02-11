<style lang="scss">
@import '@/assets/styles/main-light';

.searchDiv{
    z-index:10;
}

</style>

<template>
    <div class="position-relative">
        <div class="rowcontent position-fixed">
            <map-view :objects="objects" :object="objectTrack"/>
            <div class="mt-5 ml-5 mr-5 row"
            v-on-click-outside="hideSearch">
                <div @click="startSearch" class="searchDiv col-auto">
                    <search @show-result="showResult" :active="active"
                    :objects="objects"/>
                </div>
                <div v-if="objectResult" class="resultDiv">
                    <result
                            class="ml-3 col-auto"
                            :object="object"
                            @directions-object="directionsObject"
                            @hide-result="hideResult"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import { mixin as onClickOutside } from 'vue-on-click-outside';
import Search from './partials/Search.vue';
import Result from './partials/Results.vue';
import Map from './partials/Map.vue';

export default {
    mixins: [onClickOutside],
    name: 'map-show',
    components: { Search, Result, 'map-view': Map },
    data() {
        return {
            result: false,
            object: false,
            objectResult: false,
            objectTrack: false,
            active: false,
            objects: [
                {
                    id: '1',
                    type: 'Vehicle',
                    name: 'TRA12X145',
                    // eslint-disable-next-line max-len
                    note: 'Het is al geruime tijd een bekend gegeven dat een lezer, tijdens het bekijken van de layout van een pagina, afgeleid wordt door de tekstuele inhoud.',
                    timestamps: [
                        {
                            timestamp: moment().startOf('minute').fromNow(),
                            x: 480,
                            y: 300,
                            current: true,
                        },
                        {
                            timestamp: moment().startOf('hour').fromNow(),
                            x: 380,
                            y: 320,
                            current: false,
                        },
                        {
                            timestamp: moment().startOf('week').fromNow(),
                            x: 350,
                            y: 180,
                            current: false,
                        },
                        {
                            timestamp: moment().startOf('month').fromNow(),
                            x: 520,
                            y: 150,
                            current: false,
                        },
                    ],
                },
                {
                    id: '2',
                    type: 'Vehicle',
                    name: 'TRA42X458',
                    // eslint-disable-next-line max-len
                    note: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.',
                    timestamps: [
                        {
                            timestamp: moment().startOf('hour').fromNow(),
                            x: 490,
                            y: 230,
                            current: true,
                        },
                        {
                            timestamp: moment().startOf('day').fromNow(),
                            x: 390,
                            y: 210,
                            current: false,
                        },
                        {
                            timestamp: moment().startOf('week').fromNow(),
                            x: 310,
                            y: 250,
                            current: false,
                        },
                    ],
                },
                {
                    id: '3',
                    type: 'Container',
                    name: 'AX78C-56',
                    // eslint-disable-next-line max-len
                    note: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
                    timestamps: [
                        {
                            timestamp: moment().startOf('day').fromNow(),
                            x: 630,
                            y: 170,
                            current: true,
                        },
                        {
                            timestamp: moment().startOf('week').fromNow(),
                            x: 510,
                            y: 300,
                            current: false,
                        },
                        {
                            timestamp: moment().startOf('month').fromNow(),
                            x: 380,
                            y: 220,
                            current: false,
                        },
                    ],
                },
                {
                    id: '4',
                    type: 'Container',
                    name: 'AZ88A-69',
                    // eslint-disable-next-line max-len
                    note: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                    timestamps: [
                        {
                            timestamp: moment().startOf('day').fromNow(),
                            x: 560,
                            y: 300,
                            current: true,
                        },
                        {
                            timestamp: moment().startOf('year').fromNow(),
                            x: 630,
                            y: 170,
                            current: false,
                        },
                    ],
                },
            ],
        };
    },
    created() {
        window.addEventListener('resize', this.myResizeHandler);
    },
    destroyed() {
        window.removeEventListener('resize', this.myResizeHandler);
    },
    methods: {
        myResizeHandler() {
            if (window.innerWidth <= 1003) {
                this.active = false;
            } else {
                this.active = true;
            }
        },
      showResult(object) {
        if (window.innerWidth <= 1003) {
            this.active = false;
        }
        this.object = object;
        this.objectResult = true;
      },
      hideResult() {
        this.objectResult = false;
      },
      hideSearch() {
        if (!this.objectResult) {
            this.active = false;
        }
      },
      startSearch() {
        if (!this.objectResult) {
            this.active = true;
        }
      },
      directionsObject() {
        this.objectTrack = this.object;
        this.objectResult = false;
      },
    },
};


</script>

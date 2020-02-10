<style lang="scss">
.searchbar{
    width: 320px;
}
.searchResults{
    width: 320px;
}
.timeText {
    font-size: 12px;
}
</style>

<template>
    <div>
        <div id="search">
            <div class="searchbar">
                <search @focus="searching = true"
                        @blur="searching = false"
                        placeholder='Search'
                        v-model = "query"/>
            </div>
            <transition name="fadeYS">
                <div v-if="active" class="searchResults">
                    <ul class="list-group">
                        <li class="list-group-item "
                            v-for="object in objects"
                            :key="object.id"
                            @click="showResult(object)">
                            <div class="text-capitalize d-flex justify-content-between">
                                <b>{{object.type}} {{object.name}}</b>
                                <span class="text-muted timeText">{{object.timestamps[0].timestamp}}</span>
                            </div>
                            <div>located at {{object.timestamps[0].location}}</div>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import Search from '@/components/input/Search.vue';

export default {
    name: 'map-search',
    components: { Search },

    data() {
        return {
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
                            location: '51.12345, 2.3213432',
                        },
                        {
                            timestamp: moment().startOf('hour').fromNow(),
                            location: '52.48962, 2.2048965',
                        },
                        {
                            timestamp: moment().startOf('week').fromNow(),
                            location: '50.25879, 8.5216985',
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
                            location: '49.20596, 1.2586202',
                        },
                        {
                            timestamp: moment().startOf('day').fromNow(),
                            location: '51.14584, 4.5436987',
                        },
                        {
                            timestamp: moment().startOf('week').fromNow(),
                            location: '50.25879, 8.5216985',
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
                            location: '51.12345, 2.3213432',
                        },
                        {
                            timestamp: moment().startOf('month').fromNow(),
                            location: '52.48962, 2.2048965',
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
                            timestamp: moment().startOf('year').fromNow(),
                            location: '51.12345, 2.3213432',
                        },
                    ],
                },
            ],
            searching: false,
            query: '',
        };
    },
    props: {
        active: {
            default: false,
        },
    },
    methods: {
        showResult(object) {
            console.log(object);
            this.$emit('show-result', object);
        },
    },
};
</script>

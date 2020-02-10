<style lang="scss">
//! Default
.searchbar{
    width: 350px;
}
.searchResults{
    width: 350px;
}
.timeText {
    font-size: 12px;
}

.searchResults {
    background-color: #fff;
    border: 0.5px solid lightgray;
    border-radius: 5px;

    .list-group {
        border-bottom: 0.5px solid lightgray;
    }

    .list-group-item {
        border: none;
        border-left:  0.5px solid lightgray;
        border-right:  0.5px solid lightgray;
    }
}

//! Tablet
@media screen and (max-width: 720px) {
  body {
    .searchResults{
        font-size: 90%;
    }
  }
}

//! Mobile
@media screen and (max-width: 540px) {
  body {
    .searchbar{
        width: 100%;
    }
    .searchResults{
        width: 100%;
        font-size: 85%;
    }
  }
}
</style>

<template>
    <div>
        <div id="search">
            <div class="searchbar">
                <search @focus="searching = true"
                        @blur="searching = false"
                        placeholder='Search'
                        v-model="query"/>
            </div>
            <div v-if="active" class="searchResults">
                <h5 v-if="query" class="mt-3 ml-3">Searchresults for
                    <span class="font-weight-bold">"{{query}}"</span>
                </h5>
                <h5 v-else class="mt-3 ml-3">All results</h5>
                <hr/>
                <ul v-if="filteredList.length" class="list-group">
                    <li class="list-group-item "
                        v-for="object in filteredList"
                        :key="object.id"
                        @click="showResult(object)">
                        <div class="text-capitalize d-flex justify-content-between row">
                            <b class="col-md-6">{{object.type}} {{object.name}}</b>
                            <span class="text-muted timeText col-md-auto">{{object.timestamps[0].timestamp}}</span>
                        </div>
                        <div>located at {{object.timestamps[0].location}}</div>
                    </li>
                </ul>
                <p v-else class="text-center text-muted">No objects where found!</p>
            </div>
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
    computed: {
        filteredList() {
            return this.objects.filter(object => {
                let objectList = object.name.toLowerCase().includes(this.query.toLowerCase());
                objectList += object.type.toLowerCase().includes(this.query.toLowerCase());
                return objectList;
            });
        },
    },
    props: {
        active: {
            default: false,
        },
    },
    methods: {
        showResult(object) {
            this.$emit('show-result', object);
        },
    },
};
</script>

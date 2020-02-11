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
                <ul v-if="filteredList.length" class="list-group pullRight">
                    <li class="list-group-item "
                        v-for="object in filteredList"
                        :key="object.id"
                        @click="showResult(object)">
                        <div class="text-capitalize d-flex justify-content-between row">
                            <b class="col-md-6">{{object.type}} {{object.name}}</b>
                            <span class="text-muted timeText col-md-auto">{{object.timestamps[0].timestamp}}</span>
                        </div>
                        <div>located at {{object.timestamps[0].x}} {{object.timestamps[0].y}}</div>
                    </li>
                </ul>
                <p v-else class="text-center text-muted">No objects where found!</p>
            </div>
        </div>
    </div>
</template>

<script>
import Search from '@/components/input/Search.vue';


export default {
    name: 'map-search',
    components: { Search },

    data() {
        return {
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
        objects: {
            default: null,
        },
    },
    methods: {
        showResult(object) {
            this.$emit('show-result', object);
        },
    },
};
</script>

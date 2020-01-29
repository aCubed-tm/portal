<style lang="scss">
.searchbar{
    width: 320px;
}
.searchResults{
    width: 320px;
}

</style>

<template>
    <div>
        <div id="search" class="ml-5 mt-5 position-fixed">

            <div class="searchbar">
                <search @focus="searching = true"
                        @blur="searching = false"
                        placeholder='Search'
                        v-model = "query"/>
            </div>
            <transition name="fadeY">
                <div v-if="searching || query" class="searchResults">
                    <ul class="list-group">
                        <li class="list-group-item "
                            v-for="object in objects"
                            :key="object.id">
                            <div class="text-capitalize d-flex justify-content-between">
                                {{object.name}} {{object.number}}
                                <span class="text-muted">16 seconds ago</span>
                            </div>
                            <div>located at {{object.location}}</div>
                        </li>
                    </ul>
                </div>
            </transition>
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
            objects: [
            {
                id: '1',
                name: 'vehicle',
                number: 'TRA12X145',
                location: '51.12345, 2.3213432',
            },
            {
                id: '2',
                name: 'vehicle',
                number: 'TRA42X458',
                location: '51.14584, 4.5436987',
            },
            {
                id: '3',
                name: 'container',
                number: 'AX78C-56',
                location: '51.13753, 3.1785496',
            },
            {
                id: '4',
                name: 'container',
                number: 'AZ88A-69',
                location: '52.78664, 1.7523737',
            },
            {
                id: '5',
                name: 'vehicle',
                number: 'TRA12X433',
                location: '50.77277, 3.7427276',
            },
            ],
            searching: false,
            query: '',
        };
    },
};
</script>

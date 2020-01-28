<style lang="scss">
  @import '@/assets/styles/main-light';

  .searchbar{
      width: 320px;
  }
  .searchResults{
      width: 320px;
  }
</style>
<template>
    <div>
        <div class="searchbar m-5">
            <search @focus="searching = true"
                    @blur="searching = false"
                    placeholder='Search'
                    v-model = "query">
                    <i class="fas fa-search"></i>
            </search>
        </div>
        <div v-if="searching" class="searchResults ml-5">
            <ul class="list-group">
                <li class="list-group-item " v-for="object in objects" :key="object.id">
                    <div class="text-capitalize d-flex justify-content-between">
                        {{object.name}} <span class="text-muted">16 seconds ago</span>
                    </div>
                    <div>located at {{object.location}}</div>
                </li>
            </ul>
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
                name: 'vehicle TRA12X145',
                location: '51.12345, 2.3213432',
            },
            {
                id: '2',
                name: 'vehicle TRA42X458',
                location: '51.14584, 4.5436987',
            },
            ],
            searching: false,
            query: '',
        };
    },

    methods: {
        // eslint-disable-next-line no-alert
        showResults() { console.log('test'); this.searching = true; },
        hideResults() { this.searching = false; },
    },
};
</script>

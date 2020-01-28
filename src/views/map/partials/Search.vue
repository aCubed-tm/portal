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
        <div id="search" class="ml-5 mt-5 position-fixed">
            <div class="searchbar">
                <search @focus="searching = true"
                        @blur="searching = false"
                        placeholder='Search'
                        v-model = "query">
                        <i class="fas fa-search"></i>
                </search>
            </div>
            <div v-if="searching" class="searchResults">
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
};
</script>

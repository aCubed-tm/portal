<style lang="scss">
@import '@/assets/styles/main-light';

</style>

<template>
    <div class="position-relative">
        <div class="content position-fixed">
            <map-view/>
            <search />
            <result/>
        </div>
    </div>
</template>

<script>
import Search from './partials/Search.vue';
import Result from './partials/Results.vue';
import Map from './partials/Map.vue';

export default {
    name: 'map-show',
    components: { Search, Result, 'map-view': Map },
};
</script>

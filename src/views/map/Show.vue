<template>
    <div>
        <search />
        <result class="m-5"/>
    </div>
</template>

<script>
import Search from './partials/Search.vue';
import Result from './partials/Results.vue';

export default {
    name: 'map',
    components: { Search, Result },

};
</script>

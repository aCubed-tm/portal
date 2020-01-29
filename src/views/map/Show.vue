<style lang="scss">
@import '@/assets/styles/main-light';

.backgroundMap{
    background-image: url('~@/assets/images/mapL.png');
    background-repeat:  no-repeat;
    background-attachment: fixed;
    background-size:  cover;
    width: 100vw;
    height: 100vh;
}
</style>

<template>
    <div class="backgroundMap">
        <search />
    </div>
</template>

<script>
import Search from './partials/Search.vue';

export default {
    name: 'mapShow',
    components: { Search },

};
</script>

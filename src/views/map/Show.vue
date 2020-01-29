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
        <div class="row ml-5 mt-5 position-fixed">
            <search @show-result="showResult"/>
            <transition name="fadeX">
                <result v-if="result" class="ml-3"  @hide-result="hideResult"/>
            </transition>
        </div>
    </div>
</template>

<script>
import Search from './partials/Search.vue';
import Result from './partials/Results.vue';

export default {
    name: 'map',
    components: { Search, Result },
    data() {
        return {
            result: false,
        };
    },
    methods: {
      showResult(id) {
        console.log(`selected: ${ id }`);
        this.result = true;
      },
      hideResult() {
        this.result = false;
      },
    },
};
</script>

<style lang="scss">
@import '@/assets/styles/main-light';

</style>

<template>
    <div class="position-relative">
        <div class="row ml-5 mt-5 content position-fixed"
            v-on-click-outside="stopSearch">
            <map-view/>
            <div
            @click="startSearch">
                <search @show-result="showResult" :active="active"/>
            </div>
            <transition name="fadeX">
                <result v-if="object"
                        class="ml-3"
                        :object="object"
                        @hide-result="hideResult"/>
            </transition>
        </div>
    </div>
</template>

<script>
import { mixin as onClickOutside } from 'vue-on-click-outside';
import Search from './partials/Search.vue';
import Result from './partials/Results.vue';
import Map from './partials/Map.vue';

export default {
    mixins: [onClickOutside],
    name: 'map-show',
    components: { Search, Result, 'map-view': Map },
    data() {
        return {
            result: false,
            object: false,
            active: false,
        };
    },
    methods: {
      showResult(object) {
        this.object = object;
      },
      hideResult() {
        this.active = false;
        this.object = false;
      },
      stopSearch() {
        this.active = false;
        this.object = false;
      },
      startSearch() {
          this.active = true;
      },
    },
};


</script>

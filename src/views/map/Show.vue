<style lang="scss">
@import '@/assets/styles/main-light';

.iets{
    z-index:10;
}

</style>

<template>
    <div class="position-relative">
        <div class="rowcontent position-fixed">
            <map-view/>
            <div
            class="mt-5 ml-5 row" v-on-click-outside="stopSearch">
                <div @click="startSearch" class="iets" ><search @show-result="showResult" :active="active"/></div>
                <transition name="fadeX">
                <result v-if="object"
                        class="ml-3"
                        :object="object"
                        @hide-result="hideResult"/>
            </transition>
            </div>
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

<style lang="scss">
@import '@/assets/styles/light/main';

.searchDiv{
    z-index:10;
}

</style>

<template>
    <div class="position-relative">
        <div class="rowcontent position-fixed">
            <map-view/>
            <div class="mt-5 ml-5 mr-5 row showBox"
            v-on-click-outside="hideResult">
                <div @click="startSearch" class="searchDiv col-auto">
                    <search @show-result="showResult" :active="active"/>
                </div>
                <div class="resultDiv">
                    <result v-if="object"
                            class="ml-3 col-auto"
                            :object="object"
                            @hide-result="hideResult"/>
                </div>
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
    created() {
        window.addEventListener('resize', this.myResizeHandler);
    },
    destroyed() {
        window.removeEventListener('resize', this.myResizeHandler);
    },
    methods: {
        myResizeHandler() {
            if (window.innerWidth <= 1003) {
                this.active = false;
            } else {
                this.active = true;
            }
        },
      showResult(object) {
        if (window.innerWidth <= 1003) {
            this.active = false;
        }
        this.object = object;
      },
      hideResult() {
        this.active = false;
        this.object = false;
      },
      startSearch() {
        if (!this.object) {
            this.active = true;
        }
      },
    },
};


</script>

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
        <div class="row ml-5 mt-5 position-fixed"
            v-on-click-outside="stopSearch">
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

export default {
    mixins: [onClickOutside],
    name: 'map',
    components: { Search, Result },
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

<style lang="scss">
  @import '@/assets/styles/light/main';

  .wider--nav-wrap {
    margin: 0 -30px;
  }
</style>

<template>
  <div class="h-100 d-flex position-relative">
    <nav-bar :filled="false" class="position-absolute" style="z-index:10;">
      <div class="wider--nav-wrap">
        <search v-if="!detail" @detail="showResult($event)" :objects="objects"
          :initial-load-completed="initialLoadCompleted"/>
        <detail v-else
                :object="detail"
                @hide-result="backToSearch()"/>
      </div>
    </nav-bar>

    <map-view :objects="objects" :object="track"/>
  </div>
</template>

<script>
import TrackingAPI from '@/services/API/TrackingAPI';
import Search from './partials/Search.vue';
import Detail from './partials/Detail.vue';
import Map from './partials/Map.vue';
import Nav from '@/components/Nav.vue';

export default {
    components: {
      Search,
      Detail,
      MapView: Map,
      NavBar: Nav,
    },
    data() {
        return {
          initialLoadCompleted: false,
          detail: null,
          track: null,
          objects: [],
        };
    },
    methods: {
      showResult(object) {
        this.detail = object;
        this.track = this.detail;
      },

      backToSearch() {
        this.track = null;
        this.detail = null;
      },
    },
    mounted() {
      TrackingAPI.getAllObjects()
        .then(response => {
          const { error, data } = response.data;
          if (error) throw new Error(error.message || 'Unknown error.');

          this.objects = data;
          setTimeout(() => {
            this.initialLoadCompleted = true;
          }, 500);
        });
    },
};


</script>

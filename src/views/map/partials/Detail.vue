<style lang="scss" scoped>
.back-button{
  i {
    transition: transform .3s ease, color .3s ease;
  }

  &:hover i {
    color: #CF366D;
    transform: translateX(-3px);
  }
}

.live-icon {
  height: 22px;
  width: 22px;
}

.list-group-item {
    background-color: transparent !important;
}
</style>

<template>
    <div id="searchResults" class="card-body">
        <div class="back-button" @click="hideResult">
            <button>
                <i class="fas fa-arrow-left"></i> Back
            </button>
        </div>
        <br/>
        <h5>Tracking information for </h5>
        <div>
            <b class="h4">{{object.name}}</b>
            <live-icon
                v-if="moment(this.object.lastLocation.time) > moment().minute(-1)"
                class="live-icon">
            </live-icon>
            <div v-else class="text-danger pt-3">
              <i class="fas fa-eye-slash pr-1"></i> Lost sight of object.
              <div class="small text-black-50">Trying to recover sight of object...</div>
            </div>
        </div>
        <br/>
        <p class="small">{{object.note}}</p>
        <br/>
        <p class="card-subtitle mb-2">
          <small class="text-uppercase font-weight-bold text-muted">Last update</small>
          <br/> {{ latestDate }}
        </p>
        <br/>
        <div>
          <div v-if="history.length > 0">
            <h5>History</h5>
            <ul class="list-group list-group-flush">
                <li v-for="location in history.slice(0, 5)" :key="`loc_${location}`"
                  class="list-group-item px-0">
                  {{ moment(location.time).format('LLL') }}
                  <br/><span class="small text-muted">located at: x{{location.x}}, y{{location.y}}</span>
                </li>
            </ul>
          </div>
          <div v-else class="d-flex justify-content-center align-items-center pt-5">
            <div class="d-flex flex-column justify-content-center align-items-center">
              <div class="spinner-grow" style="width: 5rem; height: 5rem; color:rgba(19, 63, 250, .1);" role="status">
                <span class="sr-only">Loading...</span>
              </div>
              <span class="text-muted mt-3 small">Fetching history...</span>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import TrackingAPI from '@/services/API/TrackingAPI';
import LiveIcon from '@/components/LiveIcon.vue';

export default {
    name: 'map-results',
    components: { LiveIcon },

    data() {
      return {
        history: [],
        longPuller: null,
      };
    },

    props: {
      object: {
          default: {},
      },
    },

    methods: {
      refreshHistory() {
        TrackingAPI.getObjectHistoryByUuid({ uuid: this.object.uuid })
          .then(response => {
            const { error, data } = response.data;
            if (error) throw new Error(error.message || 'Unknown error.');

            this.history = data;
          });
      },
      moment: (param) => moment(param),
      hideResult() {
          this.$emit('hide-result');
      },
    },

    mounted() {
      this.longPuller = setTimeout(() => {
        this.refreshHistory();
      }, 5000);
    },

    beforeDestroy() {
      clearTimeout(this.longPuller);
    },

    computed: {
        latestDate() {
            return moment(this.object.lastLocation.time).format('LLL');
        },
    },
};
</script>

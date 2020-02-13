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
        <search @detail="showResult($event)" :objects="objects"/>
      </div>
    </nav-bar>

    <map-view :objects="objects" :object="track"/>
  </div>
</template>

<script>
import moment from 'moment';
import Search from './partials/Search.vue';
import Map from './partials/Map.vue';
import Nav from '@/components/Nav.vue';

export default {
    components: {
      Search,
      MapView: Map,
      NavBar: Nav,
    },
    data() {
        return {
          detail: null,
          track: null,
          objects: [
              {
                  id: '1',
                  type: 'Vehicle',
                  name: 'TRA12X145',
                  // eslint-disable-next-line max-len
                  note: 'Het is al geruime tijd een bekend gegeven dat een lezer, tijdens het bekijken van de layout van een pagina, afgeleid wordt door de tekstuele inhoud.',
                  timestamps: [
                      {
                          timestamp: moment().startOf('minute'),
                          x: 480,
                          y: 300,
                          current: true,
                      },
                      {
                          timestamp: moment().startOf('hour'),
                          x: 380,
                          y: 320,
                          current: false,
                      },
                      {
                          timestamp: moment().startOf('week'),
                          x: 350,
                          y: 180,
                          current: false,
                      },
                      {
                          timestamp: moment().startOf('month'),
                          x: 520,
                          y: 150,
                          current: false,
                      },
                  ],
              },
              {
                  id: '2',
                  type: 'Vehicle',
                  name: 'TRA42X458',
                  // eslint-disable-next-line max-len
                  note: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy.',
                  timestamps: [
                      {
                          timestamp: moment().startOf('hour'),
                          x: 490,
                          y: 230,
                          current: true,
                      },
                      {
                          timestamp: moment().startOf('day'),
                          x: 390,
                          y: 210,
                          current: false,
                      },
                      {
                          timestamp: moment().startOf('week'),
                          x: 310,
                          y: 250,
                          current: false,
                      },
                  ],
              },
              {
                  id: '3',
                  type: 'Container',
                  name: 'AX78C-56',
                  // eslint-disable-next-line max-len
                  note: 'All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.',
                  timestamps: [
                      {
                          timestamp: moment().startOf('day'),
                          x: 630,
                          y: 170,
                          current: true,
                      },
                      {
                          timestamp: moment().startOf('week'),
                          x: 510,
                          y: 300,
                          current: false,
                      },
                      {
                          timestamp: moment().startOf('month'),
                          x: 380,
                          y: 220,
                          current: false,
                      },
                  ],
              },
              {
                  id: '4',
                  type: 'Container',
                  name: 'AZ88A-69',
                  // eslint-disable-next-line max-len
                  note: 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.',
                  timestamps: [
                      {
                          timestamp: moment().startOf('day'),
                          x: 560,
                          y: 300,
                          current: true,
                      },
                      {
                          timestamp: moment().startOf('year'),
                          x: 630,
                          y: 170,
                          current: false,
                      },
                  ],
              },
          ],
        };
    },
    methods: {
      showResult(object) {
        this.detail = object;
      },

      directionsObject() {
        this.track = this.detail;
      },
    },
};


</script>

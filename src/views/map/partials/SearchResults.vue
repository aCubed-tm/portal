<style lang="scss">
  .live-icon {
    height: 14px;
    width: 14px;
    transform: translateX(3px) translateY(-2px) rotate(30deg);
  }
</style>

<template>
    <div>
      <div v-if="active" class="searchResults">
          <ul v-if="filteredList.length" class="list-unstyled pullRight">
            <a href="#" class="text-dark text-decoration-none">
              <li class="d-block position-relative p-3 c-pointer"
                  v-for="object in filteredList"
                  :key="object.id"
                  @click="showDetail(object)">

                    <div class="text-capitalize">
                        <b>{{object.name}}</b>

                        <live-icon
                          v-if="Math.abs(new Date()) < 60000"
                          class="live-icon">
                        </live-icon>

                        <i v-else class="fas fa-exclamation-circle pl-2 small text-black-50"></i>
                        <span class="text-muted small text-lowercase float-right">
                          RC(x{{Math.round(object.lastLocation.x)}}, y{{Math.round(object.lastLocation.y)}})
                        </span>
                    </div>
                    <span class="small">
                      Located {{ moment(object.lastLocation.time).from() }}
                    </span>
              </li>
            </a>
          </ul>
          <p v-else class="text-center text-muted mt-5">No traceables where found!</p>
      </div>
  </div>
</template>

<script>
import moment from 'moment';
import LiveIcon from '@/components/LiveIcon.vue';

export default {
    components: { LiveIcon },

    props: {
      query: {
        required: true,
      },
      active: {
          default: true,
      },
      objects: {
          default: null,
      },
    },

    data() {
        return {
            searching: false,
            time: new Date(),
        };
    },

    computed: {
        filteredList() {
            return this.objects.filter(
              object => object.name.toLowerCase().includes(this.query.toLowerCase()),
            );
        },
    },

    methods: {
        showDetail(object) {
            this.$emit('detail', object);
        },

        moment: (param) => moment(param),

        refreshTime() {
          this.time = new Date();

          setTimeout(() => {
            this.refreshTime();
          }, 1000);
        },
    },

    mounted() {
      this.refreshTime();
    },
};
</script>

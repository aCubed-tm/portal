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
                          v-if="Math.abs(object.timestamps[0].timestamp.diff(time)) < 60000"
                          class="live-icon">
                        </live-icon>

                        <i v-else class="fas fa-exclamation-circle pl-2 small text-black-50"></i>
                        <span class="text-muted small text-lowercase float-right">
                          {{object.timestamps[0].timestamp.from(time)}}
                        </span>
                    </div>
                    <span class="small">
                      Located at {{object.timestamps[0].x}} {{object.timestamps[0].y}}
                    </span>
              </li>
            </a>
          </ul>
          <p v-else class="text-center text-muted mt-5">No traceables where found!</p>
      </div>
  </div>
</template>

<script>
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
            return this.objects.filter(object => {
                let objectList = object.name.toLowerCase().includes(this.query.toLowerCase());
                objectList += object.type.toLowerCase().includes(this.query.toLowerCase());
                return objectList;
            });
        },
    },

    methods: {
        showDetail(object) {
            this.$emit('detail', object);
        },

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

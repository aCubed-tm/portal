<style lang="scss">
  .organisation-switcher {
    user-select: none;
    position: relative;

    .active-organisation {
      line-height: 1.2;
      padding: 15px;
      border: 1px solid rgba(0,0,0,.04);
      outline:none !important;

      .symbol {
        height: 30px;
        width: 30px;
        background: var(--primary);
      }

      &:hover, &:focus, &:active{
        background:rgba(245, 245, 248, 0.527);
        cursor: pointer;
      }
      &.selecting {
        background:rgba(245, 245, 248, 0.7);
        cursor: pointer;
      }
    }

    .selector {
      background:white;
      padding: 5px 0;
      border: 1px solid rgba(0, 0, 0, 0.04);
      transform: translateY(-5px);
      box-shadow: 0px 7px 13px 2px rgba(0, 0, 0, 0.04);
      position: absolute;
      width: 100%;

      ul {
        margin: 0;

        li {
          padding: 15px;

          &:hover {
            background:rgba(245, 245, 248, 0.527);
            cursor: pointer;
          }

          &.active {
            background:rgba(245, 245, 248, 0.7);
            cursor: pointer;
          }
        }
      }
    }
  }
</style>

<template>
    <div class="organisation-switcher">
      <button class="d-block w-100 text-left active-organisation d-flex align-items-center rounded"
        :class="{ 'selecting': showSelector }" @click.stop="showSelector = !showSelector">
        <div class="rounded symbol text-white d-flex justify-content-center align-items-center mr-2">
          <i class="fas fa-building"></i>
        </div>
        <div class="flex-grow-1">
          <div class="font-weight-bold">{{ activeOrganisation.name }}</div>
          <div class="small">Organisation</div>
        </div>
        <div>
          <i class="fas fa-chevron-down small"></i>
        </div>
      </button>
      <div class="selector" :class="{ 'd-none': !showSelector }">
        <ul class="list-unstyled">
          <li v-for="organisation in organisations" :key="`258_org_${organisation.uuid}`">
            {{ organisation.name }}
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      showSelector: false,
      activeOrganisationUuid: 0,
      organisations: [
        { name: 'Administrators', uuid: 0 },
      ],
    };
  },

  computed: {
    activeOrganisation() {
      return this.organisations.find((org) => org.uuid === this.activeOrganisationUuid);
    },
  },

  methods: {
    onClick() {
      this.showSelector = false;
    },
  },

  mounted() {
    document.addEventListener('click', this.onClick);
  },

  beforeDestroy() {
    document.removeEventListener('click', this.onClick);
  },
};
</script>

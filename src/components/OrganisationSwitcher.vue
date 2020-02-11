<style lang="scss">
  .organisation-switcher {
    .active-organisation {
      line-height: 1.4;
      .symbol {
        height: 40px;
        width: 40px;
        background:blue;
      }
    }
  }
</style>

<template>
    <div class="organisation-switcher">
      <div class="active-organisation">
        <div class="float-left rounded symbol text-white">
          <i class="fas fa-building"></i>
        </div>
        <div class="font-weight-bold">{{ activeOrganisation.name }}</div>
        <div class="small">Organisation</div>
      </div>
      <div class="selector" :class="{ 'd-none': !showSelector }">
        <ul>
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
        { name: 'Developers', uuid: 0 },
      ],
    };
  },

  computed: {
    activeOrganisation() {
      return this.organisations.find((org) => org.uuid === this.activeOrganisationUuid);
    },
  },
};
</script>

<template>
  <div>
    <p class="breadcrumbs small text-muted mb-2">User / Organisations</p>
    <h1 class="m-0 h3">Your Organisations</h1>

    <ul class="list-group mt-5">
      <li v-for="organisation in organisations" :key="`394_org_${organisation.uuid}`"
        class="list-group-item d-flex align-items-center">
        <span class="flex-grow-1">
          {{ organisation.name }}
        </span>
        <span class="text-muted small d-inline-flex align-items-center mr-5">
          {{ organisation.isAdmin ? 'Administrator' : 'Member' }}
        </span>
        <button @click="switchOrganisation(organisation.uuid)" class="btn btn-light shadow-sm btn-sm">Switch</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      organisations: [
        { uuid: 1, name: 'Dapibus ac facilisis in', isAdmin: false },
        { uuid: 2, name: 'Cras justo odio', isAdmin: true },
        { uuid: 3, name: 'Vestibulum at eros', isAdmin: false },
      ],
    };
  },

  methods: {
    switchOrganisation() { },
  },
};
</script>

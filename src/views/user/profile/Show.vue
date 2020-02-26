<style lang="scss">
  .edit-avatar {
    position: absolute;
    background: rgba(0,0,0,.5);
    backdrop-filter: saturate(180%) blur(20px);
    line-height: 1;
    bottom: 5px;
    left: 5px;
    padding: 10px;
    border-radius: .3em;
    color:white;
  }
</style>
<template>
  <div>
    <p class="breadcrumbs small text-muted mb-2">User / Profile</p>
    <h1 class="m-0 h3">Your Profile</h1>

    <div class="row mt-5">
      <div class="col-9">
        <form @submit.prevent>
          <div class="row mb-3">
            <div class="col-12 col-md-6">
              <text-field :disabled="pending" v-model="firstName" label="First name"></text-field>
            </div>
            <div class="col-12 col-md-6">
              <text-field :disabled="pending" v-model="name" label="Last name"></text-field>
            </div>
          </div>

          <div class="mb-3">
            <select-field :disabled="pending" v-model="primaryEmail" label="Email" class="mb-2">
              <option>Loading...</option>
            </select-field>
            <p class="small m-0 text-muted">
              Multiple email addresses can be assigned to your account.
              Only your primary address will be used for communication purposes.
            </p>
          </div>
        </form>
      </div>
      <div class="col-3 pl-5">
        <label for="avatar-upload">Avatar</label>
        <button disabled class="d-block position-relative">
          <img class="img-fluid rounded" id="avatar"
            :src="`https://api.adorable.io/avatars/400/${loggedInUser.uuid}.png`" alt="Avatar">
          <div class="edit-avatar d-none"><i class="fas fa-pen-square pr-1"></i> Edit</div>
        </button>
        <input type="file" id="avatar-upload" class="d-none">
      </div>
    </div>

    <hr class="mt-5 mb-3"/>
    <p>
      <router-link class="text-danger" to="/auth/logout">Logout</router-link>
    </p>

  </div>
</template>

<script>
import { mapState } from 'vuex';

import Select from '@/components/input/Select.vue';
import Text from '@/components/input/Text.vue';

export default {
  components: { TextField: Text, SelectField: Select },

  data() {
    return {
      pending: true,
      firstName: '',
      name: '',
      primaryEmail: '',
    };
  },

  methods: {
    loadCurrentState() {
      this.firstName = this.loggedInUser.profile.firstName;
      this.name = this.loggedInUser.profile.name;
      // this.pending = false;
    },
  },

  computed: {
    ...mapState({
      loggedInUser: state => state.auth.loggedInUser,
    }),
  },

  mounted() {
    this.loadCurrentState();
  },
};
</script>

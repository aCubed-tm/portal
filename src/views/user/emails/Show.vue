<template>
  <div>
    <p class="breadcrumbs small text-muted mb-2">User / Emails</p>
    <h1 class="m-0 h3">Email Settings</h1>

    <ul class="list-group mt-5">
      <li v-for="email in sortedEmails"
        :key="`394_emails_${email.emailAddress}`"
        class="list-group-item d-flex align-items-center">

        <div class="flex-grow-1 py-2">
          <p class="text-weight-bold m-0">
            {{ email.emailAddress }}
            <span v-if="email.isPrimary" class="small text-success text-weight-normal">
              – Primary
            </span>
          </p>
        </div>

        <div v-tooltip.top-center="'Not implemented.'">
          <button disabled v-if="!email.isPrimary" @click="makePrimary(email)"
            class="btn btn-light shadow-sm btn-sm">Make primary</button>
        </div>

        <div v-tooltip.right="'Not implemented.'">
          <button disabled
            class="ml-5" @click="deleteEmail(email)"><i class="fas fa-trash-alt text-muted"></i></button>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState } from 'vuex';

import ProfileAPI from '@/services/API/ProfileAPI';

export default {
  data() {
    return {
      emails: [],
    };
  },

  computed: {
    sortedEmails() {
      return this.emails.concat().sort((a) => a.isPrimary ? -1 : 1);
    },

    ...mapState({
      loggedInUser: state => state.auth.loggedInUser,
    }),
  },

  methods: {
    makePrimary() {},
    deleteEmail() {},
    loadEmails() {
      ProfileAPI.getEmailsWhereUserUuid({ uuid: this.loggedInUser.uuid })
        .then(response => {
          const { error, data } = response.data;
          if (error) throw new Error(error.message || 'Unknown error.');

          this.emails = data;
        });
    },
  },

  watch: {
    loggedInUser() {
      this.loadEmails();
    },
  },

  mounted() {
    this.loadEmails();
  },
};
</script>

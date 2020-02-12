<template>
  <div>
    <p class="breadcrumbs small text-muted mb-2">User / Security</p>
    <h1 class="m-0 h3">Account Security</h1>

    <h2 class="h4 mt-5 mb-4">Change your password</h2>
    <form @submit.prevent>
      <div style="background: var(--highlighted);" class="p-3 rounded-lg mb-2">
        <password-field label="Old password" placeholder="Type your old password for confirmation."></password-field>
        <password-field label="New password" class="mt-3"></password-field>
        <p class="small mt-1 mb-0 text-muted">
          Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
        </p>

        <button class="btn btn-danger mt-3">Update and logout everywhere</button>
      </div>
    </form>

    <hr class="my-5"/>

    <h2 class="h4 m-0">Sessions</h2>
    <p class="text-muted mt-1 mb-4">
      This is a list of all devices on which you're possibly still logged in.
    </p>

    <ul class="list-group">
      <li v-for="session in sessions" :key="`434_session_${session.tokenHash}`"
        class="list-group-item d-flex align-items-center">

        <div class="flex-grow-1">
          <p class="font-weight-bold mb-0"><i class="fas fa-globe-europe mr-1"></i> {{ session.ip }}</p>
          <p v-if="session.tokenHash == '123'" class="small m-0 text-muted">Your current session.</p>
        </div>

        <button class="ml-5" @click="closeSession(email)"><i class="fas fa-trash-alt text-danger"></i></button>
      </li>
    </ul>
  </div>
</template>

<script>
import Password from '@/components/input/Password.vue';

export default {
  components: { PasswordField: Password },

  data() {
    return {
      sessions: [
        { ip: '192.168.1.1', tokenHash: '123' },
        { ip: '172.0.0.1', tokenHash: '234' },
      ],
    };
  },
};
</script>

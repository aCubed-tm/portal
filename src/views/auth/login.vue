<style lang="scss" skoped>
  #wrapper .container-fluid {
    background: black;
    min-height: calc(var(--vh, 1vh) * 100);
  }

  h1 { font-size: 22px; }
  form { min-width: 330px; }
</style>

<template>
  <div id="wrapper" class="text-white">
    <div class="container-fluid d-flex justify-content-center align-items-center">
      <div class="pt-2 pb-5">
        <header class="mb-4 text-center">
          <h1>Sign in to Portal</h1>
          <p v-if="userRegistered" class="mt-1">{{ formData.email }}</p>
        </header>

        <form v-if="!userRecognized" @submit.prevent="validateEmail" novalidate>
          <email v-model="formData.email" label="Your email address"
            placeholder="john.doe@example.com"/>
          <input type="submit" value="Continue" class="btn btn-primary float-right">
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import email from '@/components/input/email.vue';

export default {
  components: { email },

  data() {
    return {
      processed: false,
      processing: false,
      formData: {
        email: '',
        password: '',
      },
      userRecognized: false,
      userRegistered: false,
    };
  },

  methods: {
    changeEmail() {
      this.processed = false;
      this.processing = false;
      this.userRecognized = false;
      this.userRegistered = false;
    },
    validateEmail() {
      this.processed = true;
      this.processing = true;
        // Perform user lookup
        this.userRecognized = true;
        this.userRegistered = true;
        this.processing = false;
    },
  },
};
</script>

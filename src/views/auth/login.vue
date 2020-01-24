<style lang="scss" skoped>
  #wrapper .container-fluid {
    background: rgb(11,4,37);
    background: radial-gradient(200% 150% ellipse at 50% 215%, rgba(190,100,154,1), rgba(11,4,37,1));
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: calc(var(--vh, 1vh) * 100);
  }

  h1 { font-size: 22px; }
  form { min-width: 330px; }

  #disclaimer{
    width: 330px;
    font-size: 12px;
    padding-top: 100px;
    p {
      margin-bottom: 5px;
    }
  }
</style>

<template>
  <div id="wrapper" class="text-white">
    <div class="container-fluid d-flex justify-content-center align-items-center">
      <div class="pt-2 pb-5">
        <header class="mb-4 text-center">
          <h1>{{title}}</h1>
          <p v-if="subtitle" class="mt-1">{{ subtitle }}</p>
        </header>

        <form v-if="!userRecognized" @submit.prevent="validateEmail" novalidate>
          <email v-model="formData.email" label="Your email address"
            placeholder="john.doe@example.com"/>
          <input type="submit" value="Continue" class="btn btn-primary float-right">
        </form>

        <form v-if="userRecognized && !userRegistered" @submit.prevent="registerPassword" novalidate>
          <email label="Your email address" disabled=true change=true @go-back="goBack"
            :placeholder="formData.email"/>
          <password v-model="formData.password" label="Your password"
            placeholder="Create your password"/>
          <input type="submit" value="Register" class="btn btn-primary float-right">
        </form>

        <form v-if="userRecognized && userRegistered" @submit.prevent="validatePassword" novalidate>
          <password v-model="formData.password" label="Your password"
            placeholder="Enter your password"/>
          <input type="submit" value="Login" class="btn btn-primary float-right">
        </form>

        <div v-if="disclaimer" id="disclaimer" class="text-secondary">
          <p>Disclaimer:</p>
          <p>For demonstrative purposes, registration will be limited to a select number of email addresses.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import email from '@/components/input/email.vue';
import password from '@/components/input/password.vue';

export default {
  components: { email, password },

  data() {
    return {
      processed: false,
      processing: false,
      disclaimer: false,
      formData: {
        email: '',
        password: '',
      },
      userRecognized: false,
      userRegistered: false,
      title: 'Sign in to Portal',
      subtitle: null,
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

      if (this.formData.email === 'test@test.com') { //! Fake invited user login
        this.userRecognized = true;
        this.userRegistered = false;
        this.title = 'Nice to meet you!';
        this.subtitle = 'You were invited to create an account.';
        this.disclaimer = true;
      } else { //! Fake existing user login
        this.userRecognized = true;
        this.userRegistered = true;
        this.title = 'Great to see you!';
        this.subtitle = this.formData.email;
      }

      this.processing = false;
    },
    goBack() {
      this.processing = true;

      this.userRecognized = false;
      this.userRegistered = false;

      this.processing = false;
    },
  },
};
</script>

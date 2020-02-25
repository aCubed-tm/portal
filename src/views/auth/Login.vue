<style lang="scss">
  @import '@/assets/styles/dark/main';

  #wrapper .container-fluid {
    background: rgb(11,4,37);
    background: radial-gradient(200% 150% ellipse at 50% 215%,
     rgba(190,100,154,1), rgba(11,4,37,1));
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: calc(var(--vh, 1vh) * 100);
  }

  h1 { font-size: 22px; }
  form {
    margin-left: auto;
    margin-right: auto;
    width: 80vw;
    @media screen and (min-width:350px){
      width: 330px;
    }
  }

</style>

<template>
  <div id="wrapper" class="text-white">
    <div class="container-fluid d-flex justify-content-center align-items-center">
      <div class="pt-2 pb-5">
        <div v-if="!registrationComplete">

          <header class="mb-4 text-center">
            <h1>{{title}}</h1>
            <p v-if="subtitle" class="mt-1">{{ subtitle }}</p>
          </header>

          <ValidationObserver ref="observer">

            <transition name="expandY">
              <template v-if="!userRecognized">
                <form @submit.prevent="validateEmail" novalidate>
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <email v-model="formData.email" label="Your email address"
                      placeholder="john.doe@example.com" :show-error="processed"
                      :error="error || errors[0]"/>
                  </ValidationProvider>

                  <button type="submit" class="btn btn-primary float-right mt-3" :disabled="processing">
                    <template v-if="processing">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only">Loading...</span>
                    </template>
                    <template v-else> Continue </template>
                  </button>
                </form>
              </template>
            </transition>

            <transition name="expandY">
              <template v-if="userRecognized && !userRegistered">
                <form @submit.prevent="registerPassword" novalidate>
                  <a class="float-right text-primary small pt-1" @click.prevent="restart"
                    href="#change-email">Change</a>

                  <email label="Your email address" class="mb-3" disabled=true
                    :placeholder="formData.email"/>

                  <ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
                    <password v-model="formData.password" label="Your password"
                      placeholder="Create your password" :show-error="processed"
                      :error="errors[0]"/>
                  </ValidationProvider>

                  <button type="submit" class="btn btn-primary float-right mt-3" :disabled="processing">
                    <template v-if="processing">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only">Loading...</span>
                    </template>
                    <template v-else> Register </template>
                  </button>
                </form>
              </template>
            </transition>

            <transition name="expandY">
              <template v-if="userRecognized && userRegistered && !requiresProfileSetup">
                <form @submit.prevent="validatePassword" novalidate>
                  <password v-model="formData.password" label="Your password"
                    :show-error="processed" placeholder="Enter your password"
                    :error="error"/>

                  <button type="submit" class="btn btn-primary float-right mt-3" :disabled="processing">
                    <template v-if="processing">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only">Loading...</span>
                    </template>
                    <template v-else> Login </template>
                  </button>
                </form>
              </template>
            </transition>

            <transition name="expandY">
              <template v-if="userRecognized && userRegistered && requiresProfileSetup">
                <form @submit.prevent="createProfile" novalidate>
                  <ValidationProvider name="firstname" rules="required" v-slot="{ errors }">
                    <textInput v-model="formData.firstname" label="Your firstname"
                      placeholder="Enter your firstname" :show-error="processed"
                      :error="errors[0]" class="mb-3"/>
                  </ValidationProvider>

                  <ValidationProvider name="lastname" rules="required" v-slot="{ errors }">
                    <textInput v-model="formData.name" label="Your lastname"
                      placeholder="Enter your lastname" :show-error="processed"
                      :error="errors[0]"/>
                  </ValidationProvider>

                  <button type="submit" class="btn btn-primary float-right mt-3" :disabled="processing">
                    <template v-if="processing">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span class="sr-only">Loading...</span>
                    </template>
                    <template v-else> Continue </template>
                  </button>
                </form>
              </template>
            </transition>

          </ValidationObserver>
        </div>

        <div v-else class="text-center mt-5">
          <header class="mb-4 text-center">
            <h1>Check your inbox.</h1>
            <p v-if="subtitle" class="mt-1">Verify your email address to login.</p>
          </header>

          <img src="images/mailSent.svg" height="120px" alt="mail sent image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//* Imports
import { mapActions, mapState } from 'vuex';
import AuthService from '@/services/AuthService';
import AuthenticationAPI from '@/services/API/AuthenticationAPI';
import ProfileAPI from '@/services/API/ProfileAPI';

import Email from '@/components/input/Email.vue';
import Password from '@/components/input/Password.vue';
import TextInput from '@/components/input/Text.vue';

export default {
  components: { Email, Password, TextInput },

  data() {
    return {
      processed: false,
      processing: false,
      formData: {
        email: 'martijn.driesen@mail.be',
        password: '',
        firstname: '',
        name: '',
      },
      userRecognized: false,
      userRegistered: false,
      registrationComplete: false,
      requiresProfileSetup: false,
      title: 'Sign in to Portal',
      subtitle: null,
      error: '',
    };
  },

  computed: {
    ...mapState({
      loggedInUser: state => state.auth.loggedInUser,
    }),
  },

  methods: {
    async validateEmail() {
      this.processed = true;
      this.error = '';

      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.processing = true;

      AuthService.meet(this.formData.email)
        .then((user) => {
          if (user.isRegistered) {
            this.processed = false; // Reset validation errors.
            this.userRecognized = true;
            this.userRegistered = true;
            this.title = 'Welcome back!';
            this.subtitle = this.formData.email;
          } else if (user.hasInvites) {
            this.processed = false; // Reset validation errors.
            this.userRecognized = true;
            this.userRegistered = false;
            this.title = 'Nice to meet you!';
            this.subtitle = 'You were invited to create an account.';
          } else { this.error = 'We couldn\'t find an account for this email address.'; }
        })
        .catch((error) => {
          console.error('Cannot meet user.', error);
        })
        .finally(() => {
          this.processing = false;
        });
    },

    async registerPassword() {
      this.processed = true;
      this.error = '';

      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.processing = true;

      AuthenticationAPI.register({
          email: this.formData.email,
          password: this.formData.password,
        })
        .then((response) => {
          const { error } = response.data;
          if (error) throw new Error(error.message || 'Unknown error.');

          this.processed = false; // Reset validation errors.
          this.registrationComplete = true;
        })
        .finally(() => {
          this.processing = false;
        });
    },

    validatePassword() {
      this.processed = true;
      this.processing = true;
      this.error = '';

      this.authenticate({
          email: this.formData.email,
          password: this.formData.password,
        })
        .then(() => {
          this.processed = false; // Reset validation errors.
          if (
            this.loggedInUser.profile
            && 'firstName' in this.loggedInUser.profile
            && 'firstName' in this.loggedInUser.profile
          ) window.location.href = '/'; // Force reload.
          else this.requireProfileSetup();
        })
        .catch(error => {
          this.error = error.message;
          throw error;
        });

      this.processing = false;
    },

    requireProfileSetup() {
      this.requiresProfileSetup = true;
      this.title = 'We would love to know your name,';
      this.subtitle = 'so we can address you more appropriately.';
    },

    async createProfile() {
      this.processed = true;
      this.error = '';

      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.processing = true;

      ProfileAPI.createWhereUserUuid({
        uuid: this.loggedInUser.uuid,
        data: {
          firstname: this.formData.firstname,
          name: this.formData.name,
          description: '',
        },
      })
        .then(() => {
          this.loadProfile(this.loggedInUser.uuid).then(() => {
            window.location.href = '/'; // Force reload.
          });
        })
        .catch(error => {
          throw error;
        });
    },

    restart() {
      this.processing = false;
      this.userRecognized = false;
      this.userRegistered = false;
      this.requiresProfileSetup = false;
      this.registrationComplete = false;

      this.title = 'Sign in to Portal';
      this.subtitle = '';
    },

    ...mapActions({
      authenticate: 'auth/authenticate',
      loadProfile: 'auth/loadProfile',
    }),
  },
};
</script>

<style lang="scss">
  @import '@/assets/styles/main-dark';

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
        <header class="mb-4 text-center">
          <h1>{{title}}</h1>
          <p v-if="subtitle" class="mt-1">{{ subtitle }}</p>
        </header>

        <div v-if="!emailSend">
          <ValidationObserver ref="observer">
            <form v-if="!userRecognized" @submit.prevent="validateEmail"
            novalidate>
              <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                <email v-model="formData.email" label="Your email address"
                  placeholder="john.doe@example.com"
                  :error="nonRegisterdMail ? nonRegisterdMail : errors[0]"/>
              </ValidationProvider>

              <input type="submit" value="Continue"
              class="btn btn-primary float-right">
            </form>

            <form v-if="userRecognized && !userRegistered"
            @submit.prevent="registerPassword" novalidate>
              <email label="Your email address" disabled=true change=true @go-back="goBack"
                :placeholder="formData.email"/>

              <ValidationProvider name="password" rules="required|min:8" v-slot="{ errors }">
                <password v-model="formData.password" label="Your password"
                  placeholder="Create your password" :error="errors[0]"/>
              </ValidationProvider>

              <input type="submit" value="Register"
              class="btn btn-primary float-right">
            </form>

            <form v-if="userRecognized && userRegistered && !userFirstRegister"
            @submit.prevent="validatePassword" novalidate>
              <password v-model="formData.password" label="Your password"
                placeholder="Enter your password"/>

              <input type="submit" value="Login" class="btn btn-primary float-right">
            </form>

            <form v-if="userRecognized && userRegistered && userFirstRegister"
            @submit.prevent="registerName" novalidate>
              <ValidationProvider name="firstname" rules="required" v-slot="{ errors }">
                <textInput v-model="formData.firstname" label="Your firstname"
                  placeholder="Enter your firstname" :error="errors[0]"/>
              </ValidationProvider>

              <ValidationProvider name="lastname" rules="required" v-slot="{ errors }">
                <textInput v-model="formData.name" label="Your lastname"
                  placeholder="Enter your lastname" :error="errors[0]"/>
              </ValidationProvider>

              <input type="submit" value="Continue"
              class="btn btn-primary float-right">
            </form>
          </ValidationObserver>
        </div>

        <div v-else class="text-center mt-5">
          <img src="images/mailSent.svg" height="120px" alt="mail sent image"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//* Imports
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
        email: '',
        password: '',
        firstname: '',
        name: '',
      },
      userRecognized: false,
      userRegistered: false,
      userFirstRegister: false,
      title: 'Sign in to Portal',
      subtitle: null,
      emailSend: false,
      nonRegisterdMail: '',
    };
  },
  methods: {
    //* Submit methods
    async validateEmail() {
      this.nonRegisterdMail = '';

      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.processed = true;
      this.processing = true;

      if (this.formData.email === 'a@a.com') {
        //! Mock not allowed user
        this.nonRegisterdMail = 'This email has no access';
        this.processed = false;
        return;
      }

      if (this.formData.email === 'test@test.com') {
        //! Mock invited user
        this.userRecognized = true;
        this.title = 'Nice to meet you!';
        this.subtitle = 'You were invited to create an account.';
      } else {
        //! Mock existing user
        this.userRecognized = true;
        this.userRegistered = true;
        this.title = 'Great to see you!';
        this.subtitle = this.formData.email;
      }

      this.processing = false;
    },
    async registerPassword() {
      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.processing = true;

      this.emailSend = true;

      this.processing = false;
    },
    validatePassword() {
      this.processing = true;

      this.title = 'We would love to know your name,';
      this.subtitle = 'so we can address you more appropriately.';
      this.userFirstRegister = true;

      this.processing = false;
    },
    async registerName() {
      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.processing = true;

      this.processing = false;
    },

    //* Other buttons methods
    goBack() {
      this.processing = true;

      this.userRecognized = false;
      this.userRegistered = false;
      this.userFirstRegister = false;
      this.title = 'Sign in to Portal';
      this.subtitle = '';
      this.emailSend = false;

      this.processing = false;
    },
  },
};
</script>

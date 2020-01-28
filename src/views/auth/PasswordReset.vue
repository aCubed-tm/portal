<style lang="scss">
#wrapper .container-fluid {
  background: rgb(11, 4, 37);
  background: radial-gradient(
    200% 150% ellipse at 50% 215%,
    rgba(190, 100, 154, 1),
    rgba(11, 4, 37, 1)
  );
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: calc(var(--vh, 1vh) * 100);
}

h1 {
  font-size: 22px;
}
form {
  width: 80vw;
  @media screen and (min-width: 350px) {
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
        </header>
        <ValidationObserver ref="observer">
        <form @submit.prevent="recover_password(this.email)" novalidate>
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <email v-model="email" label="Your email address" placeholder="john.doe@example.com" :error="errors[0]"/>
          </ValidationProvider>
          <input
            type="submit"
            value="Continue"
            class="btn btn-primary float-right"
          />
           <p v-if="this.message.length > 0" :class="{'text-danger': hasError }">{{this.message}}</p>
        </form>
       </ValidationObserver>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Email from '@/components/input/Email.vue';

export default {
  components: { Email },

  data() {
    return {
      email: '',
      message: ' ',
      hasError: false,
      title: 'Recover password',
    };
  },

  methods: {
    ...mapActions({
      send_recovery: 'auth/sendRecovery',
    }),

    async recover_password() {
      const valid = await this.$refs.observer.validate();
      if (!valid) return;

      this.send_recovery(this.email).then(response => {
        if (!response.error) {
          this.message = response.value;
          this.hasError = false;
        }
        this.hasError = true;
        this.message = response.error;
      });
    },
  },
};
</script>

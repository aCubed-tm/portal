import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import RequestService from '@/services/RequestService';
import AuthService from '@/services/AuthService';
import router from './router';
import store from './store';

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

const ENDPOINT_EDGE = 'https://api.acubed.app';
RequestService.init(ENDPOINT_EDGE);

new Vue({
  router,
  store,
  render: h => h(App),

  beforeMount() {
    if (AuthService.isLoggedIn()) {
      AuthService.setAuthorizationHeader();

      AuthService.renew()
        .then((response) => {
          // TODO: get user data
          console.log(response);
        })
        .catch(() => { AuthService.logout(); });
    }
  },

  mounted() {
    this.calculateViewportHeight();

    window.addEventListener('resize', () => { this.calculateViewportHeight(); });
    window.addEventListener('orientationchange', () => { this.calculateViewportHeight(); });
  },

  methods: {
    calculateViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      this.isMobile = window.innerWidth < 767.98;
    },
  },
}).$mount('#app');

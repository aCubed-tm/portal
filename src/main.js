import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules.umd';
import * as moment from 'moment';
import { directive as onClickOutside } from 'vue-on-click-outside';
import App from './App.vue';
import RequestService from '@/services/RequestService';
import AuthService from '@/services/AuthService';
import router from './router';
import store from './store';

// onclick outside
Vue.directive('on-click-outside', onClickOutside);

// moment
Vue.use(moment);

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('en', en);

// Install components globally
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

const ENDPOINT_EDGE = 'https://api.acubed.app/v1/';
RequestService.init(ENDPOINT_EDGE);

new Vue({
  router,
  store,
  render: h => h(App),

  beforeMount() {
    if (AuthService.isLoggedIn()) {
      this.$store.dispatch('auth/reauthenticate');
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

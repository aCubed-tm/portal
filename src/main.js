import Vue from 'vue';
import Vuex from 'vuex';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import App from './App.vue';

import router from './router';
import store from './store';

axios.defaults.baseURL = 'api.acubed.app';

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),

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

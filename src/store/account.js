import axios from 'axios';

export default {
  namespaced: true,
  state: {
    email: null,
    profile: {
      name: null,
      firstname: null,
    },
  },
  getters: {
    // get email
    email(state) {
      return state.email;
    },

    // get profile credentials
    profile(state) {
      return state.profile;
    },
  },
  mutations: {
    // set email state
    SET_EMAIL(state, email) {
      state.email = email;
    },

    // Set profile state
    SET_PROFILE(state, profile) {
      state.profile.name = profile.name;
      state.profile.firstname = profile.firstname;
    },
  },
  actions: {

    // check if email is already registered
    // email: email value given by user
    // returns commit to SET_EMAIL
    async checkEmailRegistered(_, email) {
      const response = await axios.get('/auth/is_registered', email);
      if (!response.data.error) {
        return response.data.value;
      }
      return null;
    },

    // check if password is correct
    // email: email value given by user
    // password: password given by user
    // set email in state + try to get profile credentials
    // returns True if authenticate is successfull
    // returns False if authenticate has failed
    async authenticate({ commit, dispatch }, { email, password }) {
      const response = await axios.post('/auth/login', { email, password });
      if (!response.data.error && response.data.value) {
        commit('SET_EMAIL', email);
        dispatch('getProfileCredentials', email);
        return response.data.value;
      }
      return false;
    },

    // create a password for user
    // email: email given by user
    // password: password given by user
    // return True if password is set
    // return False if password set has failed
    async createPassword(_, { email, password }) {
      const response = await axios.post('', { email, password }); // url aanpassen!
      if (!response.data.error) {
        return response.data.value;
      }
      return false;
    },

    // add credentials to profile
    // firstname: firstname given by user
    // name: name given by user
    // return commit to SET_PROFILE if credentials are set
    // return False if credentials set has failed
    async addProfileCredentials({ commit }, { firstname, name }) {
      const response = await axios.post('', { firstname, name }); // url aanpassen!
      if (!response.data.error && response.data.value) {
        const profile = { firstname, name };
        commit('SET_PROFILE', profile);
        return true;
      }
      return false;
    },

    // get profile credentials when email is registered
    // email: given by state
    // return commit to SET PROFILE
    async getProfileCredentials({ commit }, email) {
      const response = await axios.post('', { email }); // url aanpassen!
      if (!response.data.error) {
        const profile = { firstname: response.data.value.firstname, name: response.data.value.name };
        return commit('SET_PROFILE', profile);
      }
      return false;
    },

    // send recovery email
    // email: given by user
    // return true if mail is sent
    async sendRecovery(email) {
      const response = await axios.post('', { email }); // url aanpassen!
      if (!response.data.error) {
        return response.data;
      }
      return response.data;
    },
  },
};

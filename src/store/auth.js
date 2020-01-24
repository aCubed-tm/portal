import axios from 'axios';

export default {
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
    SET_PROFILE(state, { firstname, name }) {
      state.profile.name = name;
      state.profile.firstname = firstname;
    },
  },
  actions: {

    // check if email is already registered
    // email: email value given by user
    // returns commit to SET_EMAIL
    async checkEmailRegistered({ commit }, email) {
      const response = await axios.get('', email);
      if (response.data) {
        return commit('SET_EMAIL', response.data);
      }
      return null;
    },

    // check if password is correct
    // email: email value given by user
    // password: password given by user
    // returns True if authenticate is successfull
    // returns False if authenticate has failed
    async authenticate(_, { email, password }) {
      const response = await axios.post('', { email, password });
      if (response.data) {
        return true;
      }
      return false;
    },

    // create a password for user
    // email: email given by user
    // password: password given by user
    // return True if password is set
    // return False if password set has failed
    async createPassword(_, { email, password }) {
      const response = await axios.post('', { email, password });
      if (response.data) {
        return true;
      }
      return false;
    },

    // add credentials to profile
    // firstname: firstname given by user
    // name: name given by user
    // return commit to SET_PROFILE if credentials are set
    // return False if credentials set has failed
    async addProfileCredentials({ commit }, { firstname, name }) {
      const response = await axios.post('', { firstname, name });
      if (response.data) {
        commit('SET_PROFILE', { firstname, name });
        return true;
      }
      return false;
    },
  },
};

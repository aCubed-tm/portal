import JwtDecode from 'jwt-decode';
import AuthService from '@/services/AuthService';
import JWTService from '@/services/JWTService';
import { SET_LOGGED_IN_USER_UUID, UNSET_LOGGED_IN_USER, SET_LOGGED_IN_USER_PROFILE } from '../mutation-types';
import ProfileAPI from '../../services/API/ProfileAPI';

export default {
  namespaced: true,

  state: {
    loggedInUser: {
      uuid: null,
      profile: null,
    },
  },

  getters: {},

  mutations: {
    [SET_LOGGED_IN_USER_UUID](_state, uuid) {
      _state.loggedInUser.uuid = uuid;
    },

    [SET_LOGGED_IN_USER_PROFILE](_state, user) {
      _state.loggedInUser = user;
    },

    [UNSET_LOGGED_IN_USER](_state) {
      _state.loggedInUser = {
        uuid: null,
        profile: null,
      };
    },
  },

  actions: {
    authenticate({ commit }, credentials) {
      return AuthService.login(credentials)
        .then((authResponse) => {
          const { uuid } = authResponse.data.value;
          commit(SET_LOGGED_IN_USER_UUID, uuid);

          ProfileAPI.getWhereUuid({ uuid })
            .then((profileResponse) => {
              commit(SET_LOGGED_IN_USER_PROFILE, profileResponse.data.value);
            });
        });
    },

    reauthenticate({ commit }) {
      if (!AuthService.isLoggedIn()) throw new Error('Cannot renew authentication because user is not authenticated.');

      AuthService.setAuthorizationHeader();

      const token = JWTService.getToken();
      const tokenPayload = JwtDecode(token);

      console.log(tokenPayload);

      return ProfileAPI.getWhereUuid({ uuid: tokenPayload.uuid })
        .then((profileResponse) => {
          commit(SET_LOGGED_IN_USER_PROFILE, profileResponse.data);
        })
        .catch(() => { AuthService.logout(); });
    },

    logout({ commit }) {
      AuthService.logout();
      commit(UNSET_LOGGED_IN_USER);
    },
  },
};

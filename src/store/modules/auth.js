import JwtDecode from 'jwt-decode';
import AuthService from '@/services/AuthService';
import JWTService from '@/services/JWTService';
import {
  SET_LOGGED_IN_USER_UUID,
  UNSET_LOGGED_IN_USER,
  SET_LOGGED_IN_USER_PROFILE,
  SET_INVITES,
} from '../mutation-types';
import ProfileAPI from '../../services/API/ProfileAPI';

export default {
  namespaced: true,

  state: {
    loggedInUser: {
      uuid: null,
      profile: null,
    },
    invites: [],
  },

  getters: {},

  mutations: {
    [SET_LOGGED_IN_USER_UUID](_state, uuid) {
      _state.loggedInUser.uuid = uuid;
    },

    [SET_LOGGED_IN_USER_PROFILE](_state, user) {
      _state.loggedInUser.profile = user;
    },

    [UNSET_LOGGED_IN_USER](_state) {
      _state.loggedInUser = {
        uuid: null,
        profile: null,
      };
    },
    [SET_INVITES](_state, invites) {
      _state.invites = invites;
    },
  },

  actions: {
    authenticate({ commit }, credentials) {
      return AuthService.login(credentials)
        .then((authResponse) => {
          const { token } = authResponse.data.data;
          const tokenPayload = JwtDecode(token);

          commit(SET_LOGGED_IN_USER_UUID, tokenPayload.uuid);

          ProfileAPI.getWhereUserUuid({ uuid: tokenPayload.uuid })
            .then((profileResponse) => {
              commit(SET_LOGGED_IN_USER_PROFILE, profileResponse.data.data);
            });
        });
    },

    reauthenticate({ commit }) {
      if (!AuthService.isLoggedIn()) throw new Error('Cannot renew authentication because user is not authenticated.');

      AuthService.setAuthorizationHeader();

      const token = JWTService.getToken();
      const tokenPayload = JwtDecode(token);

      commit(SET_LOGGED_IN_USER_UUID, tokenPayload.uuid);

      return ProfileAPI.getWhereUserUuid({ uuid: tokenPayload.uuid })
        .then((profileResponse) => {
          commit(SET_LOGGED_IN_USER_PROFILE, profileResponse.data.data);
        })
        .catch(() => { AuthService.logout(); });
    },

    logout({ commit }) {
      AuthService.logout();
      commit(UNSET_LOGGED_IN_USER);
    },
  },
};

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
      _state.loggedInUser = user;
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
    meet({ commit }, email) {
      return AuthService.meet(email)
        .then((authResponse) => {
          if (authResponse.invites.length > 0) {
            commit(SET_INVITES, authResponse.invites);
          }
          // if has uuid go to login, if has invites go to register else say no access
          if (authResponse.uuid) {
            return 'login';
          }
            return authResponse.invites.length > 0 ? 'register' : 'error';
        });
    },
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

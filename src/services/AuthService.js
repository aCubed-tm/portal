import axios from 'axios';
import JWTService from './JWTService';
import AuthenticationAPI from './API/AuthenticationAPI';

export default {
  isRegistered(email) {
    return AuthenticationAPI.meet({ email }).then((response) => {
      const { error, data } = response.data;
      if (error) throw new Error(error.message || 'Unknown error.');

      if (data.uuid) return true;
      return false;
    });
  },

  isInvited(email) {
    return AuthenticationAPI.meet({ email }).then((response) => {
      const { error, data } = response.data;
      if (error) throw new Error(error.message || 'Unknown error.');

      if (data.invites && data.invites.length > 0) return true;
      return false;
    });
  },

  meet(email) {
    return AuthenticationAPI.meet({ email }).then((response) => {
      const { error, data } = response.data;
      if (error) throw new Error(error.message || 'Unknown error.');

      return {
        isRegistered: data.uuid && data.uuid.length > 0,
        hasInvites: data.invites && data.invites.length > 0,
      };
    });
  },

  login(credentials) {
    return AuthenticationAPI.authenticate(credentials)
      .then((response) => {
        const { error, data } = response.data;
        if (error) throw new Error(error.message || 'Unknown error.');

        if (data.token) {
          JWTService.setToken(data.token);
          this.setAuthorizationHeader();
        }
        return response;
      });
  },

  isLoggedIn() {
    return !!JWTService.getToken();
  },

  logout() {
    return AuthenticationAPI.close().then(() => {
      JWTService.removeToken();
      this.removeAuthorizationHeader();
    });
  },

  renew() {
    if (!this.isLoggedIn()) throw new Error('Cannot renew authentication because user is not authenticated.');
    this.setAuthorizationHeader();
  },

  setAuthorizationHeader() {
    axios.defaults.headers.common.Authorization = `Bearer ${JWTService.getToken()}`;
  },

  removeAuthorizationHeader() {
    axios.defaults.headers.common.Authorization = undefined;
  },
};

import axios from 'axios';
import JWTService from './JWTService';
import AuthenticationAPI from './API/AuthenticationAPI';

export default {
  meet(email) {
    return AuthenticationAPI.meet(email)
      .then((response) => {
        const authResponse = { uuid: null, invites: [] };
        if (response.data.data.uuid) { // check if email belongs to account
          // set uuid
          authResponse.uuid = response.data.data.uuid;
        }
        if (response.data.data.invites.length > 0) { // check if email has invites
          // set invites
          authResponse.invites = response.data.data.invites;
        }
        return authResponse;
      });
  },
  login(credentials) {
    return AuthenticationAPI.getAuthorizationToken(credentials)
      .then((response) => {
        if (response.data.token) {
          JWTService.setToken(response.data.value.token);
          this.setAuthorizationHeader();
        }
      });
  },
  isLoggedIn() {
    return !!JWTService.getToken();
  },
  logout() {
    JWTService.removeToken();
    this.removeAuthorizationHeader();
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

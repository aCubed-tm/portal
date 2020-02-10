import axios from 'axios';

export default {
  getAuthorizationToken(data) {
    return axios({
      method: 'post',
      url: 'auth/authenticate',
      data,
    });
  },
  meet(data) {
    return axios({
      method: 'most',
      url: 'auth/meet',
      data,
    });
  },
};

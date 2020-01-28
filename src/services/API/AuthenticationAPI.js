import axios from 'axios';

export default {
  getAuthorizationToken(data) {
    return axios({
      method: 'post',
      url: 'auth/login',
      data,
    });
  },
  renewAuthorizationToken() {
    return axios({
      method: 'get',
      url: 'auth/',
    });
  },
};

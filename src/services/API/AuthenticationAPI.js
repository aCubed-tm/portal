import axios from 'axios';

export default {
  getAuthorizationToken(data) {
    return axios({
      method: 'post',
      url: 'authenticate',
      data,
    });
  },
  renewAuthorizationToken() {
    return axios({
      method: 'get',
      url: 'reauthenticate',
    });
  },
};

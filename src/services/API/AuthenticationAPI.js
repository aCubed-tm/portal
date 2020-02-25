import axios from 'axios';

export default {
  meet(data) {
    return axios({
      method: 'post',
      url: 'auth/meet',
      data,
    });
  },

  authenticate(data) {
    return axios({
      method: 'post',
      url: 'auth/authenticate',
      data,
    });
  },

  register(data) {
    return axios({
      method: 'post',
      url: 'auth/register',
      data,
    });
  },

  close() {
    return axios({
      method: 'get',
      url: 'auth/close',
    });
  },

  logout(data) {
    return axios({
      method: 'post',
      url: 'auth/logout',
      data,
    });
  },
};

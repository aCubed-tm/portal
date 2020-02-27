import axios from 'axios';

export default {
  getAllObjects() {
    return axios({
      method: 'get',
      url: 'tracking/objects',
    });
  },

  getObjectHistoryByUuid({ uuid }) {
    return axios({
      method: 'get',
      url: `tracking/object/${uuid}`,
    });
  },
};

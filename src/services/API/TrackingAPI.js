import axios from 'axios';

export default {
  getAllObjects() {
    return axios({
      method: 'get',
      url: 'tracking/objects',
    });
  },

  getObjectByUuid({ uuid }) {
    return axios({
      method: 'get',
      url: `tracking/object/${uuid}`,
    });
  },
};

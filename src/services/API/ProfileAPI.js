import axios from 'axios';

export default {
  getWhereUuid(data) {
    return axios({
      method: 'post',
      url: `profile/${data.uuid}`,
      data,
    });
  },
};

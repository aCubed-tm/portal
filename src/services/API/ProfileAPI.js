import axios from 'axios';

export default {
  getWhereOrganisationUuid(data) {
    return axios({
      method: 'get',
      url: `profile/organiation/${data.uuid}`,
    });
  },

  getWhereUserUuid(data) {
    return axios({
      method: 'get',
      url: `profile/user/${data.uuid}`,
    });
  },
};

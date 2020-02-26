import axios from 'axios';

export default {
  getWhereOrganisationUuid({ uuid }) {
    return axios({
      method: 'get',
      url: `profile/organiation/${uuid}`,
    });
  },

  getWhereUserUuid({ uuid }) {
    return axios({
      method: 'get',
      url: `profile/user/${uuid}`,
    });
  },

  createWhereUserUuid({ uuid, data }) {
    return axios({
      method: 'post',
      url: `profile/user/${uuid}`,
      data,
    });
  },

  getEmailsWhereUserUuid({ uuid }) {
    return axios({
      method: 'get',
      url: `profile/user/${uuid}/emails`,
    });
  },
};

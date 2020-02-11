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

    /* testdata
    const returnvalue = new Promise(
      (resolve) => {
        const returndata = {
          data: {
            data: {
              uuid: '<0x1>',
              // invites: [{ email: data, sentat: '2020-02-10', organisation: '<0x3>' }],
              invites: [],
              data,
            },
          },
        };
        resolve(returndata);
      },
    );
    return returnvalue;
    /* */
  },
};

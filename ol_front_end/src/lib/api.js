import { registerUrl, userInfoUrl } from './urls';
const axios = require('axios');

const registerApi = (obj) => {
  return axios.post(registerUrl, obj);
};

const getUserInfo = (obj) => {
  return axios.get(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${obj.accessToken}`,
    },
  });
};

export { registerApi, getUserInfo };

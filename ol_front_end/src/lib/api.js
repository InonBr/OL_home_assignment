import { registerUrl } from './urls';
const axios = require('axios');

const registerApi = (obj) => {
  return axios.post(registerUrl, obj);
};

export { registerApi };

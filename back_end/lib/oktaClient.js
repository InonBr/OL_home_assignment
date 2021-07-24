require('dotenv').config();
const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: process.env.REACT_APP_OKTA_DOMAIN,
  token: process.env.OKTA_TOKEN,
});

module.exports = client;

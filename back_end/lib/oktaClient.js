require('dotenv').config();
const okta = require('@okta/okta-sdk-nodejs');

const client = new okta.Client({
  orgUrl: process.env.ISSUER_URI,
  token: process.env.OCTA_TOKEN,
});

module.exports = client;

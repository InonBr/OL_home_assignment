const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.REACT_APP_ISSUER,
});

module.exports = oktaJwtVerifier;

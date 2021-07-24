const oktaAuthConfig = {
  url: process.env.REACT_APP_OKTA_DOMAIN,
  issuer: process.env.REACT_APP_ISSUER,
  redirectUri: window.location.origin + '/callback',
  clientId: process.env.REACT_APP_OKTA_CLIENT,
};

const oktaSignInConfig = {
  baseUrl: process.env.REACT_APP_OKTA_DOMAIN,
  clientId: process.env.REACT_APP_OKTA_CLIENT,
  redirectUri: window.location.origin + '/callback',
};

export { oktaAuthConfig, oktaSignInConfig };

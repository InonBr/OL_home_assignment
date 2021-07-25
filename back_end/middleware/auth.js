const oktaJwtVerifier = require('../lib/oktaJwtVerifier');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);
  const expectedAudience = 'api://default';

  if (!match) {
    res.status(401).send('Unauthorized');
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
};

module.exports = auth;

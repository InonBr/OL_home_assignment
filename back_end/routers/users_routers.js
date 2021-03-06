const express = require('express');
const router = express.Router();
const oktaClient = require('../lib/oktaClient');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

router.post(
  '/register',
  [
    check('firstName', 'Please enter first name').trim().not().isEmpty(),
    check('lastName', 'Please enter last name').trim().not().isEmpty(),
    check('email', 'Please includ a valid email').trim().isEmail(),
    check('password', 'Please enter a password with 8 or more characters')
      .trim()
      .isLength({
        min: 8,
      }),
    check('passwordConfirm').custom((passwordConfirm, { req }) => {
      if (req.body.password !== passwordConfirm) {
        throw new Error("Passwords don't match");
      } else {
        return passwordConfirm;
      }
    }),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req);

      // if there are errors return 400 (bed request);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newUser = {
        profile: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          login: req.body.email,
        },
        credentials: {
          password: {
            value: req.body.password,
          },
        },
      };

      oktaClient
        .createUser(newUser)
        .then((user) => {
          res.status(201);
          res.send(user);
        })
        .catch((err) => {
          return res.status(400).json({ msg: err.message });
        });
    } catch (err) {
      return res.status(500).json({ err: 'Server error', msg: err.message });
    }
  }
);

router.get('/user_info', auth, (req, res) => {
  oktaClient.getUser(req.jwt.claims.sub).then((user) => {
    return res.status(200).json({
      profile: user.profile,
    });
  });
});

module.exports = router;

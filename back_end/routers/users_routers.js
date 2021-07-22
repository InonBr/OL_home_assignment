const express = require('express');
const router = new express.Router();
const { check, validationResult } = require('express-validator');
const oktaClient = require('../lib/oktaClient');

router.post('/register', (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
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

  console.log(newUser);

  oktaClient
    .createUser(newUser)
    .then((user) => {
      res.status(201);
      res.send(user);
    })
    .catch((err) => {
      //   console.log(err);
      //   res.status(400);
      res.send({ status: err.status, message: err.message });
    });
});

module.exports = router;

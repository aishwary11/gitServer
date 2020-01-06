const express = require('express');
var router = express.Router();
var loginSchema = require('../loginModels/login');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Joi = require('@hapi/joi');
const logValid = Joi.object({
  name: Joi.string().min(3).required().pattern(new RegExp('^[a-zA-Z]{3,10}$')),
  password: Joi.string().min(3).required().pattern(new RegExp('^[a-zA-Z]{3,10}$'))
})


router.post("/", async (req, res) => {
  const validation = logValid.validate(req.body);
  res.send(validation);
  // res.send('aish is here');
  // const token = jwt.sign({
  //   _id: loginSchema._id
  // }, process.env.secret_token);
  // res.header('auth-token', token).send(token);
  // res.send('login');
})

module.exports = router;
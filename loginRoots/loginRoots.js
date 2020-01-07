const express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
var loginSchema = require('../loginModels/login');
const jwt = require('jsonwebtoken');
const key = process.env.secret_token;




router.post("/", (req, res) => {

});
// async function addToDB(req, res) {
//   var user = new User({
//     name: req.body.name,
//     password: login.hashPassword(req.body.password)
//   })
// }

module.exports = router;
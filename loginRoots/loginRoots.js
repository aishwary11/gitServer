const express = require('express');
var router = express.Router();
var loginSchema = require('../loginModels/login');

router.post("/",(req,res))
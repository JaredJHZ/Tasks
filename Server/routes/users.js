var express = require('express');
var API  = express.Router();
var {signUp,login} = require('../controllers/users');

API.post('/users/signup',signUp);
API.post('/users/login',login)
module.exports = API;
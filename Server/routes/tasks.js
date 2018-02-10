var express = require('express');
var API = express.Router();
var {getTasks,setTask} = require('../controllers/tasks');

API.get('/tasks/all',getTasks);
API.post('/tasks/add',setTask);

module.exports = API;
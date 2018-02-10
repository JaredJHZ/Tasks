require('../Config/Config');
var db = require('../DB/DB');
const express = require('express');
const user_routes = require('./routes/users');
const task_routes = require('./routes/tasks');
const parser = require('body-parser');
var app = express();
app.use(parser.json());
app.use(user_routes);
app.use(task_routes);
app.listen(process.env.PORT,()=>{
    console.log('App running in' +process.env.PORT);
})
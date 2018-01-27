const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Connected to DB');
});

exports.module = {mongoose};
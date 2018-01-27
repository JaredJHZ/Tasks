const config = require('./config.json');
var env = process.env.NODE_ENV || "development";
var con = config[env];
Object.keys(con).forEach((key)=>{
    process.env[key] = con[key];
});
console.log(process.env.MONGODB_URI);
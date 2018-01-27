const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var {Schema} = require('mongoose');
var {getParams} = require('../Server/routes/utils');
var bcrypt = require('bcrypt');
var UserSchema = new Schema({
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        validate:{
            validator: function(v){
                   return /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i.test(v);
                },
                message: " is not an email"
            },
        required:true
        },
    password:{
        type:String,
        min:6,
        max:15,
        required:true        
    },
    tokens : [{
        access:{
            type:String,
            required:true
        },
        token: {
            type:String,
            required:true
        }
    }]


    });

UserSchema.methods.toJson = ()=>{
    getParams(this.toObject,['user','email']);
};

UserSchema.methods.generateToken = async function(){
    let userInfo = {
        auth: 'access',
        email:this.email,
        user: this.user,
        id:this._id
    }
    try{
      let token = await jwt.sign(userInfo,process.env.KEY);
      this.tokens.push({access:userInfo.auth,token});
      let user = await this.save();
          return new Promise((resolve,reject)=>{
                if(user){
                    resolve(token);
                }else
                reject();
          })
    }catch(e){
        Promise.reject(e);
    }
};

UserSchema.methods.confirmKey = async function (password){
    console.log(this.password);
    bcrypt.compare(password,this.password,(err,res)=>{
        if(err){
            return false;
        }else{
           return res;
        }
    })
};

UserSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            if(err){
                console.log('error');
            }else{
                bcrypt.hash(this.password,salt,(err,hash)=>{
                    this.password = hash;
                    next();
                });
            }
        })
    }else next();
});

module.exports.User = mongoose.model('User',UserSchema);
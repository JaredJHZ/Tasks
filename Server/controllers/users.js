const {getParams} = require('../routes/utils');
const {User} = require('../../Models/User');
var signUp = async(req,res)=>{
    try{
        let body = getParams(req.body,['email','user','password',]);
        let user = new User(body);
        user.save().then((newUser)=>{
            res.send({user:newUser});
        });
    }catch(e){
        res.status(401).send({error:'error'});
    }
};

var login = async(req,res)=>{
    try{
        var body = getParams(req.body,['user','password']);
        var user = await User.findOne({user:body.user});
        if(user){
            if(user.confirmKey(body.password)){
                user.generateToken().then((token)=>{
                   res.header('x-auth',token).send({email:user.email,user:user.user});
                }).catch(e);
            }
        }else{          
            res.status(401).send({error:'User not found'});
        }
    }catch(e){

    }
}

module.exports = {signUp,login};
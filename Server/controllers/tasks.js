var {Task} = require('../../Models/tasks');
var {User} = require('../../Models/User');
var _ = require('lodash');

var getTasks = async(req,res)=>{
    if(!req.header('x-auth')){
       return res.send(404).send({error:'User not found'});
    }
    let token = req.header('x-auth');
    let user = await User.findByToken(token);
    if(!user){
        return res.status(501).send({message:'error'});
    }
    let tasks = await Task.find({user:user._id});
    if(tasks){
        res.status(404).send({message:'No taks for the user'});
    }
    res.send({tasks});
};

var setTask = async(req,res)=>{
    console.log(req.header('x-auth'));
    if(!req.header('x-auth')){
        return res.send({error:'User not found'});
     }
     let token = req.header('x-auth');
     let user = await User.findByToken(token);
     if(!user){
         return res.status(501).send({message:'error'});
        }
    console.log(user);
    let body = _.pick(req.body,['task']);
    let id = user._id;
    console.log(id);
    let task = new Task({user:id,task:body});
    let nTask = await task.save();
    if(!nTask){
        return res.status(400).send({message:'error'});
    }
    return res.send(200).send(nTask);
};

module.exports ={getTasks,setTask};
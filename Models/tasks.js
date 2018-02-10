const mongoose = require('mongoose');
const {Schema} = require('mongoose');

var taskSchema = new Schema({
    task: {
        type: String,
        required: true,
        validate : {
            validator : function(v){
                if(v.length > 5 && v.trim()>0){
                    return true
                }else return false;
            }
        }
    },
    user: {
        type : Schema.ObjectId,
        ref:'User',
        required:true
    },
    completed:{
        type: Boolean,
        default:false
    },
    date:{
        type: Number,
        default: Date.now()
    }
});

module.exports.Task = mongoose.model('Task',taskSchema);
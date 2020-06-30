const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:5,
        maxlength:255
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
        timestamps:true
    
});

module.exports = mongoose.model('User', userSchema)
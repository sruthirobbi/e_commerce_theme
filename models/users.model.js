const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

},{
        timestamps:true
    
});

userSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
            return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function(password,callBack){
    bcrypt.compare(password, this.password,(err,isMatch)=>{
        if(err)
            return callBack(err);
        else{
                if(!isMatch)
                    return callBack(null,isMatch);
                return callBack(null,this);
            }
    });
}

module.exports = mongoose.model('User', userSchema)
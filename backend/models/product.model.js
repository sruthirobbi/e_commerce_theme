const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    img:{
        type:String,
        required:true,
        data:Buffer
    },
    price:{
        type:Number,
        default: 0,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        default: 0,
        required:true
    },
},{
        timestamps:true
    
});

module.exports = mongoose.model('Product', productSchema)
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const addItemSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        minlength:3
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
},{
        timestamps:true
    
});

module.exports = mongoose.model('AddItem', addItemSchema)
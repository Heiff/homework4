const { Schema, model } = require("mongoose");

const Books = new Schema({
    _id: {
        type: Number,
        required: true
    },
    image:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    descr:{
        type:String,
        required:true
    }
});

module.exports = model('books',Books)
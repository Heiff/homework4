const { Schema,model } = require('mongoose')

const Author = new Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    birthday:{
        type:String,
        required:true
    },
    dead:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})


module.exports = model('authors',Author)
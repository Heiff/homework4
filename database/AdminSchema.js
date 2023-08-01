const { Schema,model } = require('mongoose')

const Admin = new Schema({
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = model('admin',Admin)
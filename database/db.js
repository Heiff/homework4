const mongoose = require('mongoose');


const Connect = async() =>{
try {
    await mongoose.connect("mongodb://127.0.0.1:27017/onlinebook")
    console.log('succes connecting mongodb');
} catch (error) {
    console.log('error');
}
}
module.exports = Connect;
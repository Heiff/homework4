const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../database/UserSchema')
const Secret = process.env.Secret;

const changeUser = async(req,res) => {
try {
   const { name,lastname,phone,email } = req.body;
   const { token } = req.cookies;
   const id = await jwt.verify(token,Secret)
   const data = await Users.findById(id);
   const userid = data[id - 1];
   const update = await Users.findByIdAndUpdate(id,{
       name:name ? name : userid.name,
       lastname:lastname ? lastname : userid.lastname,
       phone:phone ? phone : userid.phone,
       email:email ? email : userid.email,
       id:userid.id
   })
   res.status(200).json(update)
} catch (error) {
    res.status(500).json(error.message)
}
}

const changePassword = async(req,res) =>{
    try {
        const { password,newPass,returnPass } = req.body
        const { token } = req.cookies;
        const id = await jwt.verify(token,Secret);
        const User = await Users.findById(id);
        const compare = await bcrypt.compare(password,User.password)
        if (compare && newPass == returnPass) {
            const update = await Users.findByIdAndUpdate(id,{
                password:newPass
            })
            res.status(200).json(update)
        }
       else{
        res.status(404).json({message:'password error'})
       }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const isAuthUser = async(req,res,next) => {
    try {
        const { token } = req.cookies;
        const id = await jwt.verify(token,Secret);
        const User = await Users.findById(id);
        if (User) {
            next()
        }
        else{
            res.status(404).json({message:"error"})
        }
    } catch (err) {
       res.status(500).json(err.message) 
    }
} 

module.exports = {
    changeUser,
    changePassword,
    isAuthUser
}
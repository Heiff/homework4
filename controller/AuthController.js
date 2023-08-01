const jwt = require('jsonwebtoken');
const Users = require('../database/UserSchema');
const Admin = require('../database/AdminSchema')
const bcrypt = require('bcrypt');
const Secret = process.env.Secret;

const Register = async(req,res) => {
try {
    const data =await Users.find();
    const { name,lastname,phone,email,password } = req.body;
    const id = parseInt(data[data.length - 1]?.id || 0) + 1;
    const hashPass = await bcrypt.hash(password,5)
    if (data.length == 0) {
        const newUser = Users.create({
            id,
            name,
            lastname,
            phone,
            email,
            password:hashPass
    })
        res.status(201).json(newUser)
    }
    else{
        const data = await Users.find();
        const filterData = data.filter((el) => {
            return el.email == email
        })
        if (filterData.length == 0) {
            const newUser = Users.create(
                id,
                name,
                lastname,
                phone,
                email,
                hashPass
            )
            res.status(201).json(newUser)
        }
        res.status(404).json({message:"user bor"})
    }
} catch (error) {
   res.status(500).json(error.message)
}
}

const Login = async(req,res) => {
try {
    const data = await Users.find();
    const { email,password } = req.body;
    const filterData = data.filter((el) => {
        const comparePass = bcrypt.compare(password,el.password)
        return email == el.email && comparePass
    })
    if (filterData.length) {
        const token = await jwt.sign(filterData[0].id,Secret)
        res.cookie('token',token)
        res.status(200).json({message:token})
    }
    else{
        res.status(404).json({message:'email or password error'})
    }
} catch (err) {
 res.status(500).json(err.message)   
}
}

const RegisterAdmin = async(req,res) => {
    try {
        const data = await Admin.find();
        const { name,password } = req.body;
        const id = parseInt(data[data.length - 1]?.id || 0) + 1;
        const hashPass = await bcrypt.hash(password,5)
        if (data.length == 0) {
            const newAdmin = Admin.create({
                id,
                name:name,
                password:hashPass
        })
            res.status(201).json(newAdmin)
        }
        else{
            res.status(404).json({message:"admin bor"})
        }
    } catch (error) {
       res.status(500).json(error.message)
    }
    }

    const LoginAdmin = async(req,res) => {
        try {
            const data = await Admin.find();
            const { name,password } = req.body;
            const filterData = data.filter((el) => {
                const comparePass = bcrypt.compare(password,el.password)
                return name == el.name && comparePass
            })
            if (filterData.length) {
                const token = await jwt.sign(filterData[0].id,Secret)
                res.cookie('token',token)
                res.status(200).json({message:token})
            }
            else{
                res.status(404).json({message:'name or password error'})
            }
        } catch (err) {
         res.status(500).json(err.message)   
        }
        }

        const isAuth = async(req,res,next) =>{
            try {
                const data = await Admin.find()
                const { token } = req.cookies;
                const verify = await jwt.verify(token,Secret)
                const dataFilter = data.filter((el) => {
                    return verify == el.id
                })
                if (dataFilter.length) {
                    next()
                }
            } catch (error) {
                res.status(500).json(error.message)
            }
        }


module.exports = {
Register,
Login,
RegisterAdmin,
LoginAdmin,
isAuth
}
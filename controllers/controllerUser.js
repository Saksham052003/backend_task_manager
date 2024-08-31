const User = require('../models/moduleUser')
const jwt= require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '15d'})
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body

    try{
        const user= await User.login(email, password)

        const token= createToken(user._id)
        
        res.status(200).json({email, token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}

//signup a user
const signupUser = async (req, res) =>{
    const {firstName, lastName, phone, email, password} = req.body
    try{
        const user = await  User.signup(firstName,lastName,phone,email,password)

        const token = createToken(user._id)

        res.status(200).json({firstName,lastName,phone,email,token})
    } catch(error){
        res.status(400).json({error: error.message})
    }
}
module.exports={
    loginUser,
    signupUser
}

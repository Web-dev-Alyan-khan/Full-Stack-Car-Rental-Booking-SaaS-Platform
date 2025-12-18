import User from "../models/user.model.js"
import bcrypt, { compare } from "bcrypt"
import JWT from "jsonwebtoken"
import Car from "../models/car.model.js"


//JWT Generate
const GenerateToken = (userId) =>{
const playload = userId
return JWT.sign(playload,process.env.JWT_SECRITY)
}

export const register = async(req,res) =>{
try {
        const {name,email,password} = req.body

    if(!name || !email || !password){
        return res.json({success:false, message:"please full fill"})
    }

    const UserExist = await User.findOne({email})
    if(UserExist){
        return res.json({success:false, message:"user already exist"})
    }

    const hashPassword = await bcrypt.hash(password,8)
     
    //sava db
    const user = await User.create({
        name,
        email,
        password:hashPassword
    })

    const token = GenerateToken(user._id.toString())
    res.json({success:true, token})
    
} catch (error) {
    console.log(error)
}
}

//Login
export const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body

        const user = await User.findOne({email})
        if(!user){
            res.json({success:false, message:"user not found"})
        }

        const isMatch = await compare(password, user.password)
        if(!isMatch){
            res.json({success:false, message:"invaild password"})
        }

        const token = GenerateToken(user._id.toString())
        res.json({success:true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})
    }
}

//Get user data using Token (JWT)
export const getUserData  =async (req,res) =>{
    try {
        const {user} = req
        res.json({success:true,user})
    } catch (error) {
        console.log(error);
    }
}

//Get All Cars For The Frontend
export const getCars = async (req,res) =>{
  try {
    const cars = await Car.find({isAvailable:true});
    res.json({success:true, cars});
  } catch (error) {
    res.json({success:false, message:error.message});
  }
}

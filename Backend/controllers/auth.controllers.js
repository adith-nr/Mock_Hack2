import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import { genSalt } from "bcrypt";
import { genAuthToken } from "../middleware/token.js";


export const signupController = async (req,res)=>{
    console.log(req.body)
    const {name,email,password,state}=req.body;
    try {
        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User aldready exists"})
        }
        
        const salt = await genSalt(10)
        const hash = await bcrypt.hash(password,salt)
       
        const user = await new User({...req.body,password:hash}).save()
       
        genAuthToken(user._id,res)
        console.log("User created successfully")
        res.status(201).json({message:"User created successfully",user})


        
    } catch (error) {
        console.log("Error in Signup Controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}


export const loginController = async (req,res)=>{
    console.log(req.body)
    const {email,password}=req.body
    try {
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(400).json({message:"User does not exist"})
        }
        const isValid = await bcrypt.compare(password,user.password)

        if(!isValid){
            return res.status(400).json({message:"Invalid password"})
        }

        genAuthToken(user._id,res)
        console.log("Login successful")
        res.status(200).json({message:"Login successful",user})
    } 
    catch (error) {
        console.log("Error in Login Controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const logoutController = async (req,res)=>{
    try {
        const cookieExist = req.cookies.jwt
    if(!cookieExist){
        return res.status(400).json({message:"No one is logged in"})
    }
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in Logout Controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}
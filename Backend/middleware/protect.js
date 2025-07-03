
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

export const protectRoute=async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        const verify = jwt.verify(token,process.env.JWT_SECRET)
        const currUser = await User.findById(verify.id).select("-password")
        if(!currUser){
            return res.status(401).json({message:"Unauthorized"})
        }
        req.user = currUser
        next()
    } catch (error) {
        console.log("Error in protectRoute",error)
        res.status(500).json({message:"Internal server error"})
    }
}
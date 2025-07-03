import jwt from "jsonwebtoken";


export const genAuthToken = (userId,res)=>{
    const token = jwt.sign({
        id:userId,
    },process.env.JWT_SECRET,{
        expiresIn:"30d"
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"lax",
        secure:process.env.NODE_ENV!="development",
        maxAge:24*60*60*1000
    })
}
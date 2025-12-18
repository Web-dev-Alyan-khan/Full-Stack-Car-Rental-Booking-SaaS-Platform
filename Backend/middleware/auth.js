import JWT from "jsonwebtoken"
import User from "../models/user.model.js";

 const UserAuth = async (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.json({sucsess:false, message: "Not authorizatioin"})
    }
try {
    const userId = JWT.decode(token,process.env.JWT_SECRITY)
    if(!userId){
        return res.json({success:false, message:"not authorization"})
    }
   req.user = await User.findById(userId).select("-password")

   next()
} catch (error) {
    console.log(error)
}
}
export default UserAuth
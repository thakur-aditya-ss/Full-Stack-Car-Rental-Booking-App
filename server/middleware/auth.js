import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next)=>{
    const token = req.headers.authorization;
    if(!token){
        return res.json({success: false, message: "not authorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // If the token was signed with just the userId string, decoded will be that string.
        // If it was signed with an object { id: userId }, decoded.id would be the userId.
        const userId = typeof decoded === 'string' ? decoded : decoded.id;

        if(!userId){
            return res.json({success: false, message: "not authorized"})
        }
        req.user = await User.findById(userId).select("-password")
        next();
    } catch (error) {
        return res.json({success: false, message: "not authorized"})
    }
}
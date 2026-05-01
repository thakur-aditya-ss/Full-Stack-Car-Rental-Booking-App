import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js";


// Generate JWT Token
const generateToken = (userId)=>{
    const payload = userId;
    return jwt.sign(payload, process.env.JWT_SECRET)
}

// Register User
export const registerUser = async (req, res)=>{
    try {
        const {name, email, password, role} = req.body

        if(!name || !email || !password || password.length < 8){
            return res.json({success: false, message: 'Fill all the fields'})
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: 'User already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword, role: role || 'user'})
        const token = generateToken(user._id.toString())
        res.json({success: true, token, user})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Login User 
export const loginUser = async (req, res)=>{
    try {
        const {email, password, role} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found" })
        }
        if (role && user.role !== role) {
            return res.json({success: false, message: `Account is not registered as ${role}`})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials" })
        }
        const token = generateToken(user._id.toString())
        res.json({success: true, token, user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get User data using Token (JWT)
export const getUserData = async (req, res) =>{
    try {
        const {user} = req;
        res.json({success: true, user})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// Get All Cars for the Frontend
export const getCars = async (req, res) =>{
    try {
        const cars = await Car.find({isAvaliable: true}).populate('owner', 'name email')
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// API to update normal user profile details
export const updateUserProfile = async (req, res) => {
    try {
        const { _id } = req.user;
        const { name, dob, age, mobileNumber, aadharNumber, panNumber, licenceNumber, address } = req.body;

        await User.findByIdAndUpdate(_id, {
            name, dob, age, mobileNumber, aadharNumber, panNumber, licenceNumber, address
        });

        res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}
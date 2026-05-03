import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    role: {type: String, enum: ["owner", "user"], default: 'user' },
    image: {type: String, default: ''},
    dob: {type: String, default: ''},
    age: {type: Number, default: null},
    gender: {type: String, default: ''},
    mobileNumber: {type: String, default: ''},
    aadharNumber: {type: String, default: ''},
    panNumber: {type: String, default: ''},
    licenceNumber: {type: String, default: ''},
    address: {type: String, default: ''},
},{timestamps: true})

const User = mongoose.model('User', userSchema)

export default User
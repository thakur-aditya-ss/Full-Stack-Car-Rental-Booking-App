import express from "express";
import { getCars, getUserData, loginUser, registerUser, updateUserProfile, resetPassword } from "../controllers/userController.js";
import { updateUserImage } from "../controllers/ownerController.js";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/data', protect, getUserData)
userRouter.get('/cars', getCars)
userRouter.post('/update-profile', protect, updateUserProfile)
userRouter.post('/reset-password', resetPassword)
userRouter.post('/update-image', protect, upload.single("image"), updateUserImage)

export default userRouter;
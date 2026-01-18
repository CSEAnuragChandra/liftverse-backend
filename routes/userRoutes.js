// userroutes
import express from 'express'
const userRouter = express.Router();
import roleCheck from '../middleware/roleCheck.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { getProfile, updateProfile } from '../controllers/userController.js';

userRouter.use(authMiddleware)
userRouter.get("/getProfile",getProfile)
userRouter.put("/updateProfile",updateProfile)


export default userRouter
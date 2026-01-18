// authroutes
import express from 'express'
const authRouter= express.Router()
import {Signup,Login} from '../controllers/authController.js'

authRouter.post("/Signup",Signup)
authRouter.post("/Login",Login)

export default authRouter
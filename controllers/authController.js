//Authcontroller

import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
const Signup = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, phone, role } = req.body;
        if (!username || !email || !password || !firstName || !lastName || !phone || !role) {
            res.status(400).json({ message: "all fields mandatory" })
        }
        const emailAvailable = await User.findOne({ email });
        const usernameAvailable = await User.findOne({ username });
        const phoneAvailable = await User.findOne({ phone });
        if (emailAvailable) {
            res.status(400).json({ message: "Email already registered" });
        }
        if (usernameAvailable) {
            res.status(400).json({ message: "Username already in use" });
        }
        if (phoneAvailable) {
            res.status(400).json({ message: "phone already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            email: email,
            username: username,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            role: role
        })
        return res.status(200).json({ message: "signup successfully" })
    } catch (err) {
        res.status(400).json({ message: "something went wrong" })
    }
}

const Login = async (req, res) => {
    const { username, password,role} = req.body;
    const user = await User.findOne({username,role});
    if (!user) {
        return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid username or password" });
    }
    const accessToken = jwt.sign({id:user._id,username:username,role:user.role},process.env.secret_key,{expiresIn:"1d"})
    return res.status(200).json({accessToken})
}
export { Signup, Login }
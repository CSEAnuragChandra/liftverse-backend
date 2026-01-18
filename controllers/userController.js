//Usercontroller
import User from "../models/userModel.js";

const getProfile = async(req,res) =>{
    try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const updateProfile = async(req,res) =>{
    try {
    const userId = req.user.id;
    const user = await User.findById(userId)
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }
    if (req.body.username && req.body.username !== user.username) {
      const usernameExists = await User.findOne({ username: req.body.username });
      if (usernameExists) {
        return res.status(400).json({ message: "Username already in use" });
      }
    }
    const updates={
    email: req.body.email ||user.email,
    username: req.body.username ||user.username,
    firstName: req.body.firstName ||user.firstName,
    lastName: req.body.lastName || user.lastName,
    phone:req.body.phone || user.phone
    } 
    
    const updatedProfile = await User.findByIdAndUpdate(userId,updates,{ new: true, runValidators: true } ).select("-password");
    if (!updatedProfile) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({message:"update successfully",updateProfile})
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}

export {getProfile,updateProfile}
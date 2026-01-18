// usermodel

import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, required: true, enum: ["user", "gymOwner"] },
})
const User = mongoose.model("User", userSchema)
export default User
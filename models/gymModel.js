//gymmodel

import mongoose from "mongoose";

const gymSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tier: { type: String, enum: ["silver", "gold", "platinum"],required:true },
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true },
    }, 
    contact: {
        phone: { type: String, trim: true },
        email: { type: String, trim: true, lowercase: true },
        website: { type: String, trim: true },
    },
    facilities: [{type: String,}],
    couponsRedeemedCount: {type: Number,default: 0},
    isActive: {type: Boolean,default: true}
},{
  timestamps: true
});


const gym = mongoose.model("gym",gymSchema)
export default gym
import mongoose from "mongoose";

const redemptions  = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    coupon: { type: mongoose.Types.ObjectId, ref: "Usercoupon", required: true },
    gym: { type: mongoose.Types.ObjectId, ref: "gym", required: true },
    redeemedAt: { type: Date, default: Date.now }
})

const Redemption = mongoose.model("Redemption", redemptions);

export default Redemption
//couponmodels

import mongoose from "mongoose";
const userCoupon = mongoose.Schema(
	{
		user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
		bundle: {
			type: mongoose.Types.ObjectId,
			ref: "CouponBundle",
			required: true,
		},
		tier: {
			type: String,
			required: true,
			enum: ["Silver", "Gold", "Platinum"],
		},
		expiresAt: { type: Date, required: true },
		quantity: { type: Number, required: true, min: 0 },
	},
	{
		timestamps: true,
	}
);

const bundleCoupon = mongoose.Schema(
	{
		name: { type: String, required: true },
		tier: {
			type: String,
			required: true,
			enum: ["Silver", "Gold", "Platinum"],
		},
		price: { type: Number, required: true, min: 0 },
		validity: { type: Number, required: true },
		quantity: { type: Number, required: true, min: 1 },
		description: { type: String, default: "" },
	},
	{
		timestamps: true,
	}
);

const Usercoupon = mongoose.model("Usercoupon", userCoupon);
const Bundlecoupon = mongoose.model("Bundlecoupon", bundleCoupon);

export { Usercoupon, Bundlecoupon };

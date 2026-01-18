//Couponcontroller

import { Usercoupon, Bundlecoupon } from "../models/couponModel.js";
import gym from "../models/gymModel.js";

const listCoupons = async (req, res) => {
	try {
		const couponlist = await Bundlecoupon.find({}).select("-description");
		if (!couponlist) {
			return res.status(404).json({ Message: "Not found" });
		}
		res.status(200).json({ message: "couponlist", couponlist });
	} catch (error) {
		return res.status(500).json({ Message: "server error" });
	}
};
const buyCoupon = async (req, res) => {
	try {
		const { bundle } = req.body;
		const userId = req.user.id;
		const couponDoc = await Bundlecoupon.findById(bundle);
		if (!couponDoc) {
			return res.status(404).json({ message: "bundle not found" });
		}
		const { tier, validity, quantity } = couponDoc;
		const expiresAt = new Date();
		expiresAt.setDate(expiresAt.getDate() + validity);
		const coupon = await Usercoupon.create({
			user: userId,
			bundle,
			tier,
			expiresAt,
			quantity,
		});
		res.status(200).json({ message: "added coupon successfully", coupon });
	} catch (error) {
		return res.status(500).json({ Message: "server error" });
	}
};
const getMyCoupons = async (req, res) => {
	try {
		const userId = req.user.id;
		const myCoupons = await Usercoupon.find({ user: userId });
		if (!myCoupons) {
			return res.status(404).json({ message: "coupn not found" });
		}
		res.status(200).json({ message: "my coupons", myCoupons });
	} catch (error) {
		return res.status(500).json({ Message: "server error" });
	}
};

const couponBundle = async (req, res) => {
	try {
		const { bundle } = req.body;
		const bundleDoc = await Bundlecoupon.findById(bundle);
		if (!bundleDoc) {
			return res
				.status(404)
				.json({ message: "bundle not found", bundleDoc });
		}
		res.status(200).json({ messaage: "coupon bundle", bundleDoc });
	} catch (error) {
		return res.status(500).json({ Message: "server error" });
	}
};

const redeemCoupon = async (req, res) => {
	try {
		const { couponId, gymId } = req.body;
		const mycoupon = await Usercoupon.findOne({
			_id: couponId,
			user: req.user.id,
		});
		if (!mycoupon) {
			return res.status(404).json({ message: "coupon not found" });
		}
		if (mycoupon.quantity <= 0) {
			return res.status(404).json({ message: "coupon already redeemed" });
		}
		const Gym = await gym.findById(gymId);
		const tierPriority = { Silver: 1, Gold: 2, Platinum: 3 };
		if (tierPriority[mycoupon.tier] < tierPriority[Gym.tier]) {
			return res.status(403).json({
				message: `Your ${mycoupon.tier} tier coupon cannot be used at a ${Gym.tier} tier gym`,
			});
		}
		mycoupon.quantity -= 1;
		const updatedcoupon = await mycoupon.save();
		if (!updatedcoupon) {
			return res.status(403).json({ message: "cannot redeem" });
		}
		const Redemptions = await Redemption.create({
			user: req.user.id,
			coupon: mycoupon._id,
			gym: gymId,
		});
		await gym.findByIdAndUpdate(gymId, {
			$inc: { couponsRedeemedCount: 1 },
		});
		res.status(200).json({
			message: "redeemed",
			updatedcoupon,
			Redemptions,
		});
	} catch (error) {
		return res.status(500).json({ Message: "server error" });
	}
};

export { listCoupons, getMyCoupons, buyCoupon, couponBundle, redeemCoupon };

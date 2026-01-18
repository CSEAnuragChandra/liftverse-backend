import Redemption from "../models/redemptionModel.js";

const getRedemptionHistory = async (req, res) => {
	try {
		const redemptions = await Redemption.find({ user: req.user.id })
			.populate("coupon")
			.populate("gym")
			.sort({ redeemedAt: -1 });

		res.status(200).json({ redemptions });
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch redemption history" });
	}
};
export default getRedemptionHistory;

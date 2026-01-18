// couponroutes
import express from 'express'
const couponRouter = express.Router()
import roleCheck from '../middleware/roleCheck.js'
import authMiddleware from '../middleware/authMiddleware.js'
import { getMyCoupons, listCoupons,buyCoupon, couponBundle, redeemCoupon } from '../controllers/couponController.js'


couponRouter.get("/listcoupons",listCoupons)
couponRouter.get("/couponbundle",couponBundle)
couponRouter.post("/buycoupon",authMiddleware,roleCheck("user"),buyCoupon)
couponRouter.get("/myCoupons",authMiddleware,roleCheck("user"),getMyCoupons)
couponRouter.post("/redeemCoupon",authMiddleware,roleCheck("user"),redeemCoupon)

export default couponRouter
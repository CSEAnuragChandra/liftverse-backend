import express from 'express'
const redemptionRouter = express.Router()
import roleCheck from '../middleware/roleCheck.js'
import authMiddleware from '../middleware/authMiddleware.js'
import getRedemptionHistory from '../controllers/redemptionController.js'

redemptionRouter.get("/Redemptions",authMiddleware,roleCheck("user"),getRedemptionHistory)

export default redemptionRouter
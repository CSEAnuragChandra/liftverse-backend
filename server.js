// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import gymRouter from "./routes/gymRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import redemptionRouter from "./routes/redemptionRoutes.js";
import cors from "cors";
dotenv.config();
const PORT = process.env.Port || 7000;
const App = express();
App.disable("etag");
App.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

App.use(express.json());
App.use("/api/auth", authRouter);
App.use("/api/user", userRouter);
App.use("/api/gym", gymRouter);
App.use("/api/coupon", couponRouter);
App.use("/api/redemption", redemptionRouter);

async function main() {
	App.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	const connect = await mongoose.connect(process.env.MONGO_uri);
	console.log(`Database connected ${connect.connection.name}`);
}
main();

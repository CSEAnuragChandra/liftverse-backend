// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import gymRouter from "./routes/gymRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import redemptionRouter from "./routes/redemptionRoutes.js";
dotenv.config();
const App = express();
const PORT = process.env.Port || 7000;
App.disable("etag");
import cors from "cors";

const allowedOrigins = [
	"http://localhost:3000",
	"http://localhost:5173",
	"https://liftverse-frontend.vercel.app",
];

app.use(
	cors({
		origin: function (origin, callback) {
		
			if (!origin) return callback(null, true);

			if (allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Not allowed by CORS"));
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

app.options("*", cors());

App.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

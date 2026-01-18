// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import gymRouter from "./routes/gymRoutes.js";
import couponRouter from "./routes/couponRoutes.js";
import redemptionRouter from "./routes/redemptionRoutes.js";
App.disable("etag");
dotenv.config();
const PORT = process.env.Port || 7000;

import cors from "cors";

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://liftverse.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);

// VERY IMPORTANT
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

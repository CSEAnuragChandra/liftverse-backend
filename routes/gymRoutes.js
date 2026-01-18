// gymroutes
import express from "express";
const gymRouter = express.Router();
import roleCheck from "../middleware/roleCheck.js";
import authMiddleware from "../middleware/authMiddleware.js";
import {
	addgym,
	getGym,
	gymList,
	updategym,
	myGyms,
} from "../controllers/gymController.js";

gymRouter.get("/", gymList);
gymRouter.get("/my", authMiddleware, roleCheck("gymOwner"), myGyms);
gymRouter.get("/:id", getGym);
gymRouter.post("/addgym", authMiddleware, roleCheck("gymOwner"), addgym);
gymRouter.patch("/:id", authMiddleware, roleCheck("gymOwner"), updategym);

export default gymRouter;

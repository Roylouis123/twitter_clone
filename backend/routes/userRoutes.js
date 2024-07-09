import express from "express";
import { followUnfollowUser, getSuggestedUsers, getUserProfile } from "../controllers/userController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile/:id",protectRoute,getUserProfile);
router.post("/follow/:id",protectRoute,followUnfollowUser);
router.post("/suggested",protectRoute,getSuggestedUsers);
// router.post("/update",updateUser);

export default router
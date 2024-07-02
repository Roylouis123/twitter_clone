import express from "express";
import { followUnfollowUser, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile/:id",getUserProfile);
router.post("/follow/:id",followUnfollowUser);
// router.post("/suggested",unfollowUser);
// router.post("/update",updateUser);

export default router
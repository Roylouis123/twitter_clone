import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { commentOnPost, createNewPost, deletePost, getAllPosts, likeUnlikePost } from "../controllers/postController.js";


const router = express.Router();

router.post("/create", protectRoute, createNewPost);
router.get("/all", protectRoute, getAllPosts);
// router.get("/following", protectRoute, getFollowingPosts);
// router.get("/likes/:id", protectRoute, getLikedPosts);
// router.get("/user/:username", protectRoute, getUserPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router
import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/authController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/checkAuth", protectRoute, checkAuth);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

export default router;

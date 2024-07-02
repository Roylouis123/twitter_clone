import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protectRoute = async (req, res, next) => {
  console.log(req.cookies.jwt, "------");
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const user = await User.findById(decoded.userId).select("-password");

      if (user) {
        req.user = user;
        next();
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

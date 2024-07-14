import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateTokens } from '../lib/utils/generateTokens.js';

export const signup = async (req, res) => {
  try {
    const { email, password, username, fullName } = req.body;

    if (!email || !password || !username || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

    if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      fullName
    });

    if (newUser) {
      generateTokens(newUser._id, res);

      await newUser.save();
      
      res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        coverImg: newUser.coverImg,
        profileImg: newUser.profileImg
      });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error,"Error in signup controller")
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
		const userAcc = await User.findOne({ username });
		const isPasswordCorrect = await bcrypt.compare(password, userAcc?.password || "");

		if (!userAcc || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokens(userAcc._id, res);

		res.status(200).json({
			_id: userAcc._id,
			fullName: userAcc.fullName,
			username: userAcc.username,
			email: userAcc.email,
			followers: userAcc.followers,
			following: userAcc.following,
			profileImg: userAcc.profileImg,
			coverImg: userAcc.coverImg,
		});

  } catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json({ message: "Logged out successfully" });
};

export const checkAuth = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
};

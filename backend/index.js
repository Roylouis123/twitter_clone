import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectMongoose from "./db/connectMongo.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import notification from "./routes/notification.js";
import { v2 as cloudinary } from 'cloudinary';
import cors from "cors";

dotenv.config();

 // Configuration
 cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET_API
});

const app = express();

// apply cors
app.use(cors());


app.use(express.json({limit : '5mb'}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/notifications", notification);

app.listen(5000, (res,err) => {
  connectMongoose();
  console.log("server running on port 5000",res);
});

import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectMongoose from "./db/connectMongo.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
// app.use("/api/user", userRouter);

app.listen(4000, () => {
  connectMongoose();
  console.log("server running on port 4000");
});

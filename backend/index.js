import express from "express";
import authRoutes from "./routes/authRoutes.js";
import dotenv from "dotenv";
import connectMongoose from "./db/connectMongo.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(4000, () => {
  connectMongoose();
  console.log("server running on port 4000");
});

import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js"

const app = express();

dotenv.config();

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users/v1",userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

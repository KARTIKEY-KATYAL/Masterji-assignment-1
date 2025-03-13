import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./utils/db.js"
//import all routes
import userRoutes from "./routes/user.routes.js";

dotenv.config()

const port = process.env.PORT || 4000

const app = express()

app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

connectDB()

app.use("/api/v1/users", userRoutes);

app.get("/",(req,res)=>{
    res.send("hello world!")
})

app.listen(port,()=>{
    console.log(`App is Listening on PORT : ${port}`);    
})
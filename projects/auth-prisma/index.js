import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userroutes from "./routes/user.routes.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorisation']
}));

app.get('/',(req,res)=>{
    res.status(200).json({message:"Hello"})
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/users",userroutes)

app.listen(port, () => console.log(`Server running on port ${port}`));
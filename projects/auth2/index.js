import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/user.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(
  cors({
    origin: `http://localhost:4000`,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorisation"],
  })
);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users",userRoutes)

app.listen(port,()=>{
    console.log(`App Listening on PORT : ${port}`)
})
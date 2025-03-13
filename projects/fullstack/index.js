import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./utils/db.js"

// Import userRoutes
import userRoutes from "./routes/user.routes.js"

dotenv.config()


const app = express();
const port = process.env.PORT || 3000;

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

connectDB()

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/hello", (req, res) => {
  res.send("Hello to All!");
});
app.get("/kartikey", (req, res) => {
  res.send("Hello Kartikey!");
});
app.get("/devash", (req, res) => {
  res.send("Hello Devash!");
});

// Use Imported Routes
app.use("/api/v1/users",userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

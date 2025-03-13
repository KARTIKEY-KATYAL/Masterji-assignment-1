import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/twitter", (req, res) => {
  res.send("<h1>Twitter</h1>");
});

app.get("/login", (req, res) => {
  res.send("<h1>Hello to login page</h1>");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

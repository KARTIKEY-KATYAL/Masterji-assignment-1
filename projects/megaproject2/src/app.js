import express from "express";
import CookieParser from "cookie-parser";
const app = express();

// Add basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser())

// Import Routes
import healthroutes from "./routes/healthcheck.routes.js"


// use Routes
app.use("/api/v1/users",healthroutes)


// Add a basic test route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

export default app;

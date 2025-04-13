import app from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

dotenv.config({
    path : './env'
})

const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
    app.listen(()=>{
        console.log(`App Listening on PORT : ${port}`)
    })
})
.catch((err)=>{
    console.log(`${err} occured`)
})
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env", // Correct path to your .env file
});

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MongoDB connected! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

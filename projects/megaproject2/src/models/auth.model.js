import mongoose from "mongoose";
import { Schema } from "mongoose";
import { jwt } from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localpath: String,
      },
      default: {
        url: "https://placehold.co/600x400",
        localpath: "",
      },
      username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: [true, "password is Required"],
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
      refreshToken: {
        type: String,
      },
      forgotpasswordToken: {
        type: String,
      },
      forgotpasswordExpiry: {
        type: Date,
      },
      emailPasswordToken: {
        type: String,
      },
      emailPasswordExpiry: {
        type: Date,
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function hashpassword(next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods = async function ispasswordCorrect(password) {
  return await bcrypt.compare(this.password, password);
};

userSchema.methods = async function generateAccessToken() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods = async function generateRefreshToken() {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

userSchema.methods = async function generateHashedtoken() {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000; //20min

  return { hashedToken, unHashedToken, tokenExpiry };
};

const User = mongoose.model("User", userSchema);

export default User;

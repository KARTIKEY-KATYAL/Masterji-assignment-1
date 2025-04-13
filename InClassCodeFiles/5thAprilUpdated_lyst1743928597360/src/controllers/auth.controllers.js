import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/api-error.js";
import { sendEmail } from "../utils/mail.js";
import { emailVerificationMailgenContent,forgotPasswordMailgenContent } from "../utils/mail.js";

const registerUser = asyncHandler(async (req, res) => {
  const {email, password, username} = req.body;

  // Validate input - add trim() to remove whitespace
  if (!email?.trim() || !password?.trim() || !username?.trim()) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user exists
  const existingUser = await User.findOne({ 
    $or: [
      { email: email.toLowerCase() }, // Case insensitive check
      { username: username.toLowerCase() }
    ] 
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Create new user
  const newUser = await User.create({
    email: email.toLowerCase(),
    password,
    username: username
  });

  if (!newUser) {
    throw new ApiError(500, "Failed to create user");
  }

  const {hashedToken, tokenExpiry} = newUser.generateTemporaryToken();

  newUser.emailVerificationToken = hashedToken;
  newUser.emailVerificationExpiry = tokenExpiry;

  await newUser.save();

  const verificationLink = `${process.env.API_URL}/verify/${hashedToken}`;

  try {
    await sendEmail({
      email: newUser.email,
      subject: "Verify your Email",
      mailgenContent: emailVerificationMailgenContent(newUser.username, verificationLink)
    });
  } catch (error) {
    throw new ApiError(500, "Failed to send verification email");
  }


  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User registered successfully. Please verify your email."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password){
    return res.status(400).json(new ApiError(400, "Email and password are required"));
  }

  const user = await User.findOne({ email });

  if (!user){
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const isMatch = await user.isPasswordCorrect(password);

  if (!isMatch){
    return res.status(401).json(new ApiError(401, "Incorrect password"));
  }

  if (!user.isEmailVerified){
    return res.status(403).json(new ApiError(403, "Email not verified"));
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("refreshToken", refreshToken, cookieOptions);
  res.cookie("accessToken", accessToken, cookieOptions);

  return res.status(200).json(
    new ApiResponse(200, user, "User logged in successfully", {
      accessToken,
      refreshToken,
    })
  );
});


const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  user.refreshToken = null;
  await user.save();

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.status(200).json(new ApiResponse(200, {}, "User logged out successfully"));
});

const verifyEmail = asyncHandler(async (req, res) => {
  // const { email, username, password, role } = req.body;

  const { token } = req.params;
  if (!token) {
    return res.status(400).json(new ApiError(400, "Token is required"));
  }

  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  if (user.isEmailVerified) {
    return res.status(400).json(new ApiError(400, "Email already verified"));
  }
  if (user.emailVerificationExpiry < Date.now()) {
    return res.status(400).json(new ApiError(400, "Token expired"));
  }
  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpiry = null;
  await user.save();
  return res.status(200).json(new ApiResponse(200, user, "Email verified successfully"));
});

const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json(new ApiError(400, "Email is required"));
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  if (user.isEmailVerified) {
    return res.status(400).json(new ApiError(400, "Email already verified"));
  }
  const { hashedToken, tokenExpiry } = user.generateTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;
  await user.save();
  const verificationLink = `${process.env.API_URL}/verify/${hashedToken}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Verify your Email",
      mailgenContent: emailVerificationMailgenContent(user.username, verificationLink),
    });
  } catch (error) {
    throw new ApiError(500, "Failed to send verification email");
  }
  return res.status(200).json(new ApiResponse(200, user, "Verification email sent successfully"));
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email){
    throw new ApiError(403,"Enter your Email")
  }

  const user = await User.findOne({email})

  if (!user){
    throw new ApiError(409,"User not found")
  }

  const {hashedToken,tokenExpiry} = await user.generateTemporaryToken()

  user.forgotPasswordToken = hashedToken
  user.forgotPasswordExpiry = tokenExpiry

  await user.save()

  const passwordreseturl = `http://localhost:8000/changepassword/${forgotPasswordToken}`

  const mail = await sendEmail({email : email,
    subject :"Reverify your Account",
    mailgenContent : forgotPasswordMailgenContent(user.username,passwordreseturl)
  })

  return res.send(202).json(new ApiResponse(202,mail,"Resend verification mail send"))
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, password ,newpassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }
  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) {
    return res.status(401).json(new ApiError(401, "Incorrect password"));
  }
  user.password = newpassword;
  await user.save();
  return res.status(200).json(new ApiResponse(200, user, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?.id).select("-password -refreshToken");
  
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Current user fetched successfully"));
});

export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
};

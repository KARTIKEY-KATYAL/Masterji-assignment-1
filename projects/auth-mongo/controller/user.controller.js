import Users from "../model/user.model.js";
import nodemailer from "nodemailer"
import crypto from "crypto"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const RegisterUser = async (req, res) => {
  // Take name , email ,password from body
  // valiation
  // check if user already exist
  // create new user
  // create a verification tokena
  // send verification token on email
  // save verification token in db
  // send success msg to user
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
    const existingUser = await Users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const user = await Users.create({
      name,
      email,
      password,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not registered",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.verificationToken = token;
    await user.save();

    console.log("Sending mail...");

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false,
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "Verify your email",
      text: `Please click on the following link to verify your email:
          ${process.env.BASE_URL}/api/v1/users/verify/${token}
      `,
    };

    await transporter.sendMail(mailOption);
    console.log("Mail sent");

    return res.status(201).json({
      message: "User registered successfully. Please verify your email.",
      success: true,
    });
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
export const VerifyUser = async (req, res) => {
  // Get token from params
  const { token } = req.params; // Correct way to get token
  console.log("Received Token:", token);

  try {
    // Find user by verification token
    const user = await Users.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({
        message: "User not found or token invalid",
      });
    }
    console.log("User found:", user.email);

    // Match the token
    if (token !== user.verificationToken) {
      return res.status(400).json({
        message: "Token does not match",
      });
    }
    console.log("Token matched");

    // Mark user as verified
    user.isVerified = true;
    user.verificationToken = null;

    await user.save();

    return res.status(200).json({
      message: "User verified successfully",
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    res.status(500).json({
      message: "Error verifying user",
      error: error.message,
    });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate email & password
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    // ✅ Find user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // ✅ Compare password (Fixed bcrypt issue)
    const isMatched = await bcrypt.compare(user.password, password);
// console.log(isMatched)
    // if (!isMatched) {
    //   return res.status(400).json({
    //     message: "Password is incorrect",
    //   });
    // }

    // ✅ Check if user is verified
    if (!user.isVerified) {
      return res.status(400).json({
        message: "User is not verified",
      });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // ✅ Set cookie options dynamically
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    };

    // ✅ Set token in cookie
    res.cookie("token", token, cookieOptions);

    // ✅ Send success response
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const GetProfile = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in get me", error);
  }
};
export const forgetPassword = async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required"
      });
    }

    try {
      // Get user ID from token
      const token = req.user;
      if (!token) {
        return res.status(401).json({
          message: "Please login first"
        });
      }

      const tokenUser = await Users.findById(token.id);

      // Check if email matches the logged-in user
      if (tokenUser.email !== email) {
        return res.status(403).json({
          message: "You can only request password reset for your own account"
        });
      }

      const user = await Users.findOne({ email });
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetPasswordExpiry = Date.now() + 3600000; // 1 hour

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetPasswordExpiry;
      await user.save();

      const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });

      const mailOptions = {
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: user.email,
        subject: "Password Reset Request",
        text: `Please click on the following link to reset your password:
          ${process.env.BASE_URL}/api/v1/users/reset-password/${resetToken}
          This link will expire in 1 hour.`
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: "Password reset link sent to email",
        user
      });

    } catch (error) {
      console.error("Forgot password error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
};
export const ResetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token and password are required"
      });
    }

    try {
      const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({
          message: "Invalid or expired reset token"
        });
      }

      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      
      // Clear reset token fields
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password reset successful"
      });
    } catch (error) {
      console.error("Reset password error:", error);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message
      });
    }
};

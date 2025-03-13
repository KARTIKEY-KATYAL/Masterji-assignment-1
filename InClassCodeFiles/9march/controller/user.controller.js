import User from "../model/user.model.js";
import crypto from "crypto"
import nodemailer from "nodemailer"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
// Get the details of User
// Validate the Details
// Check if User already exist
// Save User in db
// create a token for user
// save token in db
// send user token via email
// send success message

    // step 1
    const {name,email,password} = req.json

    // step 2
    if (!name || !email || !password ){
        return res.status(400).json({
            message : "All fields are required"
        })
    }

    try {
      // step 3
      const user = User.findOne({ email });

      if (user) {
        res.status(400).json({
          message: "user already exist",
        });
      }

      // step 4
      const newuser = await User.create({
        name,
        email,
        password,
      });
      console.log(`${newuser} added to Database`);

      // step 5
      const token = crypto.randomBytes(12).toString("hex");

      //   step 6
      newuser.verificationToken = token;
      console.log(`${token}`);

      // step 7
      // Looking to send emails in production? Check out our Email API/SMTP product!
      const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9a0bb180052a25",
          pass: "a40a2f1799a898",
        },
      });
      const info = await transport.sendMail({
        from: process.env.MAILTRAP_SENDEREMAIL,
        to: user.email,
        subject: "Verify your email", // Subject line
        text: `Please click on the following link:
      ${process.env.BASE_URL}/api/v1/users/verify/${token}
      `,
      });

      console.log("Message sent: %s", info.messageId);

      res.status(200).json({
        message : "sent successfully"
      })
    } catch (error) {
        res.status(400).json({
            message : "There is an Error"
        })
    } 
};

const verifyUser = async (req, res) => {
    // get token from url
    // validate the token
    // find user from db having that token
    // if no user found return no user found
    // remove verifiaction token
    // set isVerified = true
    // save the user

    const token = req.params

    if (!token){
        res.status(400).json({
            message : "token is not valid"
        })
    }

    try {
        const user = await User.findOne({token})

        if (!token){
            res.status(400).json({
                message : "user not found"
            })
        }

        user.verificationToken = null

        user.isVerified = true

        await user.save()
    } catch (error) {
        res.status(400).json({
            message : "user not verified"
        })
    }
};

const login = async (req, res) => {
    // take input from user
    // validate that input
    // find user by email
    // match the password
    // create a jwt token
    // save token in cookie object
    
    const {email , password} = req.json

    if (!email && !password){
        res.status(400).json({
            message : "creditenials not true"
        })
    }

    const user = await User.findOne({email})

    const isMatched = await bcrypt(user.password,password)

    if (!isMatched){
        res.status(400).json({
            message : "password not correct"
        })
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },

      "shhhhh",
      {
        expiresIn: "24h",
      }
    );
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });

};

export { registerUser, verifyUser, login };

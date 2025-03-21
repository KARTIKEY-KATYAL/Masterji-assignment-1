import express from "express"
import { Router } from "express"
import { RegisterUser,VerifyUser,LoginUser,GetProfile,ResetPassword, forgetPassword } from "../controller/user.controller.js"
import { isLoggedIn } from "../middleware/user.middleware.js"

const router = Router()

router.post("/register",RegisterUser)
router.get("/verify/:token",VerifyUser)
router.post("/login",LoginUser)
router.get("/profile",isLoggedIn,GetProfile)
router.get("/forgotpassword",isLoggedIn,forgetPassword)
router.get("/resetpassword",isLoggedIn,ResetPassword)

export default router
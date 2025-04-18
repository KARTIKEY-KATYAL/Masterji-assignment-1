import express,{Router} from "express"
import { ForgotPassword, getProfile, Login, LogOut, Register, ResetPassword, Verify } from "../controllers/user.controller.js"
import { isLoggedIn } from "../middleware/user.middleware.js"

const router = Router()

router.post("/register",Register)
router.get("/verify/:token",Verify)
router.post("/login",Login)
router.get("/forgot-password",ForgotPassword)
router.get("/reset-password",ResetPassword)
router.get("/getme", isLoggedIn ,getProfile)
router.get("/logout",isLoggedIn,LogOut)



export default router
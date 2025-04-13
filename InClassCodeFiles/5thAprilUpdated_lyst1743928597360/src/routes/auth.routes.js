import { Router } from "express";
import { loginUser, registerUser,resendEmailVerification,verifyEmail } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterValidator,userLoginValidator } from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginUser);
router.route("/verify/:token").get(verifyEmail);
router.route("/reverify").get(resendEmailVerification);

export default router;

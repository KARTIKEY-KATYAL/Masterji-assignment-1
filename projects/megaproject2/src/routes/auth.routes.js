import express, { Router } from "express"
import { useregisterationvaildator } from "../validators/index.js"
import { upload } from "../middleware/multer.middleware.js"

const router = Router()

router.route("/register", upload.array('photos', 12),useregisterationvaildator(),validate,re)

export default router
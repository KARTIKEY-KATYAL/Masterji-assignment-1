import { Router } from "express"
import express from "express"
import { registeruser } from "../controller/user.controller.js"

const router = Router()

router.post("/register",registeruser)


export default router
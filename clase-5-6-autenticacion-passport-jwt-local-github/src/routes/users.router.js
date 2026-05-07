import { Router } from 'express'
import { customPassport } from '../utils/customPassport.util.js'
import {
    registerController,
    loginController,
    logoutController,
    githubCallbackController
} from '../controllers/users.controller.js'

const router = Router()

router.post("/register", customPassport("register"), registerController)
router.post("/login", customPassport("login"), loginController)
router.get("/logout", logoutController)
router.get("/github", customPassport("github"))
router.get("/github-callback", customPassport("github"), githubCallbackController)

export default router
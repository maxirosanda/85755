import { Router } from 'express'
import User from '../models/user.model.js'
import { generateToken } from '../utils/jsonwebtoken.js'
import passport from 'passport'

const router = Router()

router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post("/register", passport.authenticate("register", {failureRedirect: "/api/users/failRegister", session: false}),(req, res) => {
    return res.status(201).json({ message: "Usuario registrado exitosamente" })
})

router.post("/login", passport.authenticate("login", {failureRedirect: "/api/users/failLogin", session: false}),(req, res) => {
    const token = generateToken(req.user)
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })
    return res.status(200).json({ message: "Usuario logueado correctamente"})
})

router.get("/failRegister", (req, res) => {
    res.status(400).json({ message: "Error al registrar usuario" })
})

router.get("/failLogin", (req, res) => {
    res.status(400).json({ message: "Error al iniciar sesion" })
})

router.get("/logout", (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Usuario deslogueado correctamente" })
})

router.get("/github",passport.authenticate("github"))

router.get("/github-callback",passport.authenticate("github",{failureRedirect: "/api/users/failLogin", session: false}),(req, res) => {
    const token = generateToken(req.user)
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })
    return res.status(200).json({ message: "Usuario logueado correctamente"})
})

export default router
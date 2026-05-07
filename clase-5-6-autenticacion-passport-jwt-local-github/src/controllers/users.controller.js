import { generateToken } from '../utils/jsonwebtoken.util.js'

export const registerController = (req, res) => {
    return res.status(201).json({ message: "Usuario registrado exitosamente" })
}

export const loginController = (req, res) => {
    const token = generateToken(req.user)
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })
    return res.status(200).json({ message: "Usuario logueado correctamente"})
}

export const logoutController = (req, res) => {
    res.clearCookie("token")
    res.json({ message: "Usuario deslogueado correctamente" })
}

export const githubCallbackController = (req, res) => {
    const token = generateToken(req.user)
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })
    return res.status(200).json({ message: "Usuario logueado correctamente"})
}
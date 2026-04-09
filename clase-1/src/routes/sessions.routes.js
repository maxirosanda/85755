import { Router } from "express";
import userModel from "../models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        await userModel.create({name,email,password,role:"user"});
        res.send("User created");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {

    const {email,password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const user = await userModel.findOne({ email, password });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    req.session.user = { name: user.name, email: user.email, role: user.role };
    res.json({message: "Session set", user: req.session.user});
});


router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({message: "Session destroyed"});
    });
    res.clearCookie("connect.sid");
});

export default router;
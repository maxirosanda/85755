import { Router } from "express";
import passport from "passport";

const router = Router();

router.post("/register",passport.authenticate("register",{failureRedirect:"/api/users/fail"}),(req,res)=>{
    res.json({message:"User registered successfully"})
})

router.post("/login",passport.authenticate("login",{failureRedirect:"/api/users/fail"}),(req,res)=>{
    req.login(req.user,(err)=>{
        if(err){
            return res.status(500).json({message:"Error al iniciar sesión"})
        }
        res.json({message:"User logged in successfully"})
    })
})

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return res.status(500).json({message:"Error al cerrar sesión"})
        }
        res.json({message:"User logged out successfully"})
    })
})

router.get("/fail",(req,res)=>{
    res.json({message:"Failed to register or login"})
})

export default router;
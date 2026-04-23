import {  Router } from "express";
import User from "../models/user.model.js";
import { createHash,isValidPassword} from "../utils/bcript.js";
import {generateToken} from "../utils/jsonWebToken.js"

const router = Router();

router.post("/register",async(req,res)=>{

    const {firstName,lastName,email,password}= req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message:"User already exists"});
    }
    
    const hashPassword = createHash(password);

    const newUser={
        firstName,
        lastName,
        email,
        password:hashPassword
    }

    await User.create(newUser);

    const token = generateToken({email,firstName,lastName});

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        maxAge:60*60*1000,
    })

    res.json({message:"User registered successfully"});
});

router.post("/login",async(req,res)=>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    const isValidUserPassword = isValidPassword(password,user.password);
    if(!isValidUserPassword){
        return res.status(401).json({message:"Invalid password"});
    }
    const accessToken = generateToken(user);
    
    res.cookie("token",accessToken,{
        httpOnly:true,
        secure:false,
        maxAge:60*60*1000,
    })
    res.json({message:"User logged in successfully"});
});

router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.json({message:"User logged out successfully"});
})

export default router;



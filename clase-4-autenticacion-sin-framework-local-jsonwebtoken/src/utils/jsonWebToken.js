import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    const hash = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"1h"});
    return hash;
}

export const authJWT = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    jwt.verify(token,process.env.JWT_SECRET,(error,payload) =>{
        if(error){
            return res.status(401).json({message:"Invalid token"});
        }
        req.user = payload.user;
        next();
    })
    
}
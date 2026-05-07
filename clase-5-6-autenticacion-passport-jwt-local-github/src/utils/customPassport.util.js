import passport from 'passport'

export const customPassport = (strategy) => {

 return (req,res,next)=>{

    passport.authenticate(strategy,(err,user,info)=>{
        if(err){
            return next(err)
        }
        if(!user){
            return res.status(400).json({ message: info.message })
        }
        req.user = user
        next()
    })(req,res,next)
}
}


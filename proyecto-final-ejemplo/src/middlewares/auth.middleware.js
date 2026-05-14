
export const userAuth = (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({ message: "No estas autenticado" })
    }
    if(req.user.role !== "user" || req.user.role !== "admin"){
        return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" })
    }
    next()
}

export const adminAuth = (req,res,next)=>{
    if(!req.user){
        return res.status(401).json({ message: "No estas autenticado" })
    }
    if(req.user.role !== "admin"){
        return res.status(403).json({ message: "No tienes permisos para acceder a este recurso" })
    }
    next()
}
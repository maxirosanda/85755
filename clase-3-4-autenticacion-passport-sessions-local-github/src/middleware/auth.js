
export const authUser = (req, res, next) => {

    if (req.isAuthenticated()) {
        if(req.user?.role === "user"){
            next();
        }else{
            res.status(403).json({message:"Forbidden"});
        }
    } else {
        res.status(401).json({message:"Unauthorized"});
    }
};

export const authAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if(req.user?.role === "admin"){
            next();
        }else{
            res.status(403).json({message:"Forbidden"});
        }
    } else {
        res.status(401).json({message:"Unauthorized"});
    }
};
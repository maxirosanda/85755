export function authUser(req, res, next) {
    if (req.session?.user?.role === "user") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export function authAdmin(req, res, next) {
    if (req.session?.user?.role === "admin") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
}


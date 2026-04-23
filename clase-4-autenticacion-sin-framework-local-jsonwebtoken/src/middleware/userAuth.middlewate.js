

export const userAuth = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
}

export const adminAuth = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next();
}
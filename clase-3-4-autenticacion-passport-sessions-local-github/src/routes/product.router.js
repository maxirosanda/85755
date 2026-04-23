import { Router } from "express";
import { authUser,authAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/",authUser, (req, res) => {
    res.send("Products");
});

router.get("/admin",authAdmin, (req, res) => {
    res.send("Admin Products");
});

export default router;
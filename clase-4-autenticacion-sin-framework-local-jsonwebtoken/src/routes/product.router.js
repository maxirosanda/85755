import Router from "express";
import { authJWT } from "../utils/jsonWebToken.js";
import { userAuth } from "../middleware/userAuth.middlewate.js";

const router = Router();

router.get("/",authJWT,userAuth,(req,res)=>{
    res.send(`Products ${req.user.firstName} ${req.user.lastName}`);
});

export default router;
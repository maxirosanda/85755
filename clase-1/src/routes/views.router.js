import { Router } from "express";
import Product from "../models/product.model.js";
import { authUser, authAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/",authUser, async (req, res) => {
    const products = await Product.find().lean();
    res.render("home", { products });
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/create-product", authAdmin, (req, res) => {
    res.render("createProduct");
});

export default router;

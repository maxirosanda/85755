import { Router } from "express";
import Product from "../models/product.model.js";
import { authAdmin, authUser } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authUser, async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/", authAdmin, async (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.stock) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const newProduct = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
    }
    const product = await Product.create(newProduct);
    res.json(product);
});

router.put("/:id", authAdmin, (req, res) => {
    res.send("Products");
});

router.delete("/:id", authAdmin, (req, res) => {
    res.send("Products");
});

export default router;
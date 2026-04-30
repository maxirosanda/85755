import { Router } from 'express'
import Product from '../models/product.model.js'
import passport from 'passport'

const router = Router()

router.get('/',passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router
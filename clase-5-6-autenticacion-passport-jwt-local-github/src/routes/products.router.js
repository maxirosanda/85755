import { Router } from 'express'
import { customPassport } from '../utils/customPassport.util.js'
import { userAuth } from '../middlewares/auth.middleware.js'
import { getProductsController, createProductController } from '../controllers/products.controller.js'

const router = Router()

router.get('/', customPassport("jwt"), userAuth, getProductsController)
router.post('/', customPassport("jwt"), userAuth, createProductController)

export default router
import {Router} from 'express'
import { getAllProducts, getProductsById } from '../controllers/Product_controller.js'

const router = Router()

router.get('/products',getAllProducts)
router.get('/products/:id',getProductsById)

export default router


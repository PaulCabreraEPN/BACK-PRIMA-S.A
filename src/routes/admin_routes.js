import {Router} from 'express'
import { confirmEmail, registerSeller, searchSellerById, searchSellerByNumberId, seeSellers } from '../controllers/Seller_controller.js'

const router = Router()

//* Ruta para registrar Usuarios
router.post("/register",registerSeller)
router.get('/confirm-account/:token',confirmEmail)
router.get('/sellers',seeSellers)
router.get('/sellers-numberid',searchSellerByNumberId)
router.get('/sellers/:id', searchSellerById)

export default router
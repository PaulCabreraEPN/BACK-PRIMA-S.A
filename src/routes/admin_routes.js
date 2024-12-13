import {Router} from 'express'
import { confirmEmail, registerSeller, seeSellers } from '../controllers/Seller_controller.js'

const router = Router()

//* Ruta para registrar Usuarios
router.post("/register",registerSeller)
router.get('/confirm-account/:token',confirmEmail)
router.get('/sellers',seeSellers)
export default router
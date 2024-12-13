import {Router} from 'express'
import { registerSeller } from '../controllers/Seller_controller.js'

const router = Router()

//* Ruta para registrar Usuarios
router.post("/register",registerSeller)


export default router
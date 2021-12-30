import {Router} from "express";
import AuthController from '../controller/authController.js'


const router = new Router()

router.post('/registration')
router.post('/login')
router.get('/users', AuthController.getAllUsrs)

export default router
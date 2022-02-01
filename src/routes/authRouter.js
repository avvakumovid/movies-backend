import {Router} from 'express';
import AuthController from '../controller/authController.js'
import {check} from 'express-validator';


const router = new Router()

router.post('/registration', [
check('username', 'Имя пользлваьеля не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 символов').isLength({min: 4})
], AuthController.registration)
router.post('/login', AuthController.login)
router.post('/auth', AuthController.auth)


export default router
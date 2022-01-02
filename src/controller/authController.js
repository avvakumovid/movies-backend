import UserService from '../service/userService.js'
import RoleService from '../service/roleService.js'
import {validationResult} from "express-validator";
import jwt from 'jsonwebtoken'
import {secret} from "../config/config.js";
import bcrypt from 'bcryptjs'

function generateAccessToken(id, role) {
    const payload = {id, role}
    return jwt.sign(payload, secret.key, {expiresIn: '24h'})
}

class AuthController {

    async registration(req, res) {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации', error})
        }
        const {username, password} = req.body;
        const condidate = await UserService.getUser(username)
        if (condidate) {
            return res.status(400).json({message: 'Пользователь с таим username уже существует'})
        }
        const hashPawword = bcrypt.hashSync(password, 7)
        //const role = new Role();
        const userRole = await RoleService.getRole('USER')
        const response = await UserService.createUser(username, hashPawword, userRole);
        return res.status(response.status).json(response.message)
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await UserService.getUser(username)
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validatePassword = bcrypt.compare(password, user.password)
            if (!validatePassword) {
                return res.status(400).json({message: `НЕверный пароль  `})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json(token)
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }


}

export default new AuthController()
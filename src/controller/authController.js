import AuthService from '../service/authService.js'
import RoleService from '../service/roleService.js'
import {validationResult} from "express-validator";
import Role from "../model/Role.js";
import jwt from 'jsonwebtoken'
import {secret} from "../config/config.js";
import bcrypt from 'bcryptjs'
import User from "../model/User.js";

function generateAccessToken(id, role) {
    const payload = {id, role}
    return jwt.sign(payload, secret.key, {expiresIn: '24h'})
}

class AuthController {

    // async registration(req, res) {
    //     const error = validationResult(req)
    //     if (!error.isEmpty()) {
    //         return res.status(400).json({message: 'Ошибка при регистрации', error})
    //     }
    //     const {username, password} = req.body;
    //     const condidate = await AuthService.getUser(username)
    //     if (condidate) {
    //         return res.status(400).json({message: 'Пользователь с таим username уже существует'})
    //     }
    //     const hashPawword = bcrypt.hashSync(password, 7)
    //     const role = new Role();
    //     const userRole = RoleService.getRole('USER')
    //     const response = await AuthService.createUser(username, hashPawword, [userRole]);
    //     return res.status(response.status).json(response.message)
    // }
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: `Ошибки при регистрации`, errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таки логином уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'Пользователь был создан'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await AuthService.getUser(username)
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

    async getAllUsrs(req, res) {
        try {
            const users = await AuthService.getAllUsers()
            return res.json(users)
        } catch (e) {

        }
    }
}

export default new AuthController()
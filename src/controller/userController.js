import UserService from "../service/userService.js";
import RoleService from "../service/roleService.js"
import {json} from "express";

class UserController {
    async addRoleToUser(req, res) {
        const {username, role} = req.body
        const user = await UserService.getUser(username)
        if(!user){
            return res.status(403).json({message: 'Пользователь не найден'})
        }
        console.log('USER', user)
        const findRole = await RoleService.getRole(role)
        if(!findRole){
            return res.status(403).json({message: 'Роль не найдена'})
        }
        console.log('ROLE', findRole)
        if(user.roles.includes(findRole.value)){
            return res.json({message: 'пользователь уже имеет такую роль'})
        }
        user.roles.push(findRole.value)
        user.save()
        return res.json('Роль добавлена')
    }

    async getAllUsrs(req, res) {
        try {
            const users = await UserService.getAllUsers()
            return res.json(users)
        } catch (e) {

        }
    }

    async getUser(req, res) {
        try {
            const {username} = req.params
            if (!username) {
                return res.status(403).json({message: 'Не указан username'})
            }
            const user = await UserService.getUser(username)
            return res.json(user);
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не найден'})
        }
    }
}

export default new UserController()
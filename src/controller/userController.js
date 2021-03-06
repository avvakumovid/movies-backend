import UserService from '../service/userService.js';
import RoleService from '../service/roleService.js'
import MoviesService from '../service/moviesService.js'
import {json} from 'express';

class UserController {
    async addRoleToUser(req, res) {
        const {username, role} = req.body
        const user = await UserService.getUser(username)
        if (!user) {
            return res.status(403).json({message: 'Пользователь не найден'})
        }

        const findRole = await RoleService.getRole(role)
        if (!findRole) {
            return res.status(403).json({message: 'Роль не найдена'})
        }
        if (user.roles.includes(findRole.value)) {
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

    async getUserById(req, res) {
        try {
            const userId = req.user.id
            // console.log(userId)
            if (!userId) {
                return res.status(403).json({message: 'Не указан id'})
            }
            const user = await UserService.getUserById(userId)
            return res.json(user);
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не найден'})
        }
    }

    async getUserWatchlist(req, res) {
        try {
            const userId = req.user.id
            if (!userId) {
                return res.status(403).json({message: 'Не указан id'})
            }
            const user = await UserService.getUserWatchlist(userId)
            return res.json(user);
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не найден'})
        }
    }

    async addMoviesToWatchList(req, res) {
        try {
            const {userId, movieId} = req.body;
            const response = await UserService.addMoviesToWatchList(userId, movieId)
            return res.json(response)

        } catch (e) {
            return res.status(403).json({message: e.message})
        }
    }

    async deleteMoviesFromWatchList(req, res) {
        try {
            const {userId, movieId} = req.query;
            // console.log(userId, movieId)
            const response = await UserService.deleteMoviesFromWatchList(userId, movieId)
            // console.log(response)
            return res.json(response)
        } catch (e) {
            // console.log(e)
            return res.status(403).json({message: e.message})
        }
    }
}


export default new UserController()
import User from "../model/User.js";


class AuthService {

    async createUser(username, password, roles) {
        try {
            const user = new User(username, password, roles)
            await user.save()
            return {status: 200, message: 'Пользователь создан'}
        } catch (e) {
            console.log(e)
            return {status: 400, message: 'Registration error'}
        }
    }

    async getUser(username) {
        const user = await User.findOne({username})
        return user
    }

    async getAllUsers() {
        const users = await User.find()
        return users
    }

    async registration() {
        try {

        } catch (e) {

        }
    }
}

export default new AuthService()
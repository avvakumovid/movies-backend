import User from "../model/User.js";


class UserService {

    async createUser(username, password, roles) {
        try {
            const user = new User({username, password, roles: [roles.value]})
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

}

export default new UserService()
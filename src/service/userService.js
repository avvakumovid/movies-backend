import User from "../model/User.js";
import Movie from "../model/Movie.js"


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

    async getUserById(id) {
        const user = await User.findById(id)
        return user
    }

    async getUserWatchlist(id) {
        const {watchlist} = await User.findById(id).populate('watchlist')
        return watchlist
    }

    async getAllUsers() {
        const users = await User.find()
        return users
    }

    async addMoviesToWatchList(userId, movieId){
        const user = await this.getUserById(userId)
        // console.log('user', user)
        if(!user){
            return
        }
        const movie = await Movie.findById(movieId);
        // console.log('movie', movie)
        if(!movie){
            return
        }
        user.watchlist.push(movie)
        await user.save()

        return {message: 'Фильм добавлен'}
    }

}

export default new UserService()
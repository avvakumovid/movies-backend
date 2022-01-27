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
            throw new Error('Пользщователь не найден')
        }
        const movie = await Movie.findById(movieId);
        // console.log('movie', movie)
        if(!movie){
            throw new Error('Фильм не найден')
        }

        if(user.watchlist.find(m => m.equals(movie._id))){
            throw new Error('Фильм уже есть в списке')
        }


        user.watchlist.push(movie)
        await user.save()

        return {message: 'Фильм добавлен'}
    }
    async deleteMoviesFromWatchList(userId, movieId){
        const user = await this.getUserById(userId)
        if(!user){
            throw new Error('Пользщователь не найден')
        }
        const movie = await Movie.findById(movieId);
        if(!movie){
            throw new Error('Фильм не найден')
        }
        let findedMovie = user.watchlist.find(m => m.equals(movie._id))
        if(!(findedMovie)){
            throw new Error('Фильма нет в списке')
        }
        let idMovie = movie._id
        User.findByIdAndUpdate(
            userId,
            { $pull: { 'watchlist': movie._id } },function(err,model){});

         return {message: 'Фильм удалён'}
    }

}

export default new UserService()
import MoviesService from '../service/moviesService.js'

class MoviesController {
   async getAllMovies(req, res) {
        try {
            const movies = await MoviesService.getAllMovies()
            return res.json(movies)
        } catch (e) {
            console.log(e)
            throw new Express.Error(e)
        }
    }

   async getMoviesCount(req, res) {
        try {
            const moviesCount = await MoviesService.getMoviesCount()
            return res.json(moviesCount)
        } catch (e) {
            console.log(e)
            throw new Express.Error(e)
        }
    }
}

export default new MoviesController()
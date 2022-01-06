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

    async getMovies(req, res) {
        try {
            let filter = null
            const {page, genreId} = req.query;
            if (genreId) {
                filter = {genre_ids: genreId}
            }
            const movies = await MoviesService.getMoviesByPage(page, filter)
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
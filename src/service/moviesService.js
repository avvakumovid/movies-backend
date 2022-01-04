import Movie from "../model/Movie.js";

class MoviesService {
   async getAllMovies() {
        try {
            const movies = await Movie.find().limit(4);
            return movies
        }catch (e) {
            console.log(e)
            throw new Express.Error(e)
        }
    }

   async getMoviesCount(){
        try {
            const movieCount = await Movie.find().count()
            return movieCount
        }catch (e) {
            console.log(e)
            throw new Express.Error(e)
        }
    }
}

export default new MoviesService()
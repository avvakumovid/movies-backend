import Movie from "../model/Movie.js";

class MoviesService {

    itemInPage = 20;

    async getAllMovies() {
        try {
            const movies = await Movie.find({genre_ids: 28}).limit(4);
            return movies
        } catch (e) {
            console.log(e)
            //  throw new Express.Error(e)
        }
    }

    async getMoviesByPage(page, filter) {
        try {

            const movies = await Movie.find(filter).skip(page * this.itemInPage).limit(this.itemInPage)
            const totalPage = Math.ceil(await this.getMoviesCount(filter) / 20 - 1)
            return {totalPage, itemInPage: this.itemInPage, movies}
        } catch (e) {
            console.log(e)
            // throw new Express.Error(e)
        }
    }

    async getMoviesByGnere(genreId){
        try {
            const movies = await Movie.find().skip(page * this.itemInPage).limit(this.itemInPage)
            const totalPage = await this.getMoviesCount({genre_ids: genreId}) / 20 - 1
            return {totalPage, itemInPage: this.itemInPage, movies}
        } catch (e) {
            console.log(e)
            // throw new Express.Error(e)
        }
    }

    async getMoviesCount(filter = null) {
        try {
            const movieCount = await Movie.find(filter).count()
            return movieCount
        } catch (e) {
            console.log(e)
            //throw new Express.Error(e)
        }
    }


}

export default new MoviesService()
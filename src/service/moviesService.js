import Movie from '../model/Movie.js';

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

    async getMovies(page = 1, filter, itemInPage = 20) {
        try {
            let skip;
            if (page <= 1) {
                skip = 0;
            } else {
                skip = page * itemInPage
            }
            const movies = await Movie.find(filter).skip(skip).limit(parseInt(itemInPage))
            const totalPage = Math.ceil(await this.getMoviesCount(filter) / 20 - 1)
            return {totalPage, itemInPage: this.itemInPage, movies}
        } catch (e) {
            console.log(e)
            // throw new Express.Error(e)
        }
    }

    async getMoviesByGnere(genreId) {
        try {
            const movies = await Movie.find().skip(page * this.itemInPage).limit(this.itemInPage)
            const totalPage = await this.getMoviesCount({genre_ids: genreId}) / 20 - 1
            return {totalPage, itemInPage: this.itemInPage, movies}
        } catch (e) {
            console.log(e)
            // throw new Express.Error(e)
        }
    }

    async getWatchlist(watchlist) {
        try {
            const movies = await Movie.find({watchlist}).skip(0).limit(this.itemInPage)
            const totalPage = await this.getMoviesCount({watchlist}) / 20 - 1
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

    async getMoviesById(id) {
        try {
            let movie = await Movie.findById(id);
            return movie
        } catch (e) {
            console.log(e)
        }
    }


}

export default new MoviesService()
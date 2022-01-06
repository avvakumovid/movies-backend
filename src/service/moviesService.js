import Movie from "../model/Movie.js";

class MoviesService {

    itemInPage = 20;

   async getAllMovies() {
        try {
            const movies = await Movie.find().limit(4);

            return movies
        }catch (e) {
            console.log(e)
          //  throw new Express.Error(e)
        }
    }

    async getMoviesByPage(page){
       try {
           const movies = await  Movie.find().skip(page * this.itemInPage).limit(this.itemInPage)
           const totalPage = await this.getMoviesCount() / 20 - 1
           return {totalPage, itemInPage: this.itemInPage, movies}
       }catch (e) {
           console.log(e)
          // throw new Express.Error(e)
       }
    }

   async getMoviesCount(){
        try {
            const movieCount = await Movie.find().count()
            return movieCount
        }catch (e) {
            console.log(e)
            //throw new Express.Error(e)
        }
    }


}

export default new MoviesService()
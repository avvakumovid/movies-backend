import Genre from "../model/Genre.js";

class GenreService {
    async getAllGenre() {
        try {
            const genres = await Genre.find()
            console.log('TUT', genres)
            return genres
        } catch (e) {
            console.log(e)
            throw new Express.Error(e)
        }
    }

    async getGenreById(id) {
        try {
            console.log(id)
            const genre = await Genre.findOne({id})

            console.log(genre)
            return genre
        } catch (e) {
            console.log(e)
            throw new Express.Error(e)
        }
    }
}

export default new GenreService()
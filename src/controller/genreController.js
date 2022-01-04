import GenreService from '../service/genreService.js'


class GenreController {
    async getAllGenre(req, res){
        const genres = await GenreService.getAllGenre()
        return res.json(genres)
    }

    async getGenreById(req, res){
        const {id} = req.params
        console.log(id)
        const genre = await GenreService.getGenreById(id)
        console.log(genre)
        if(!genre){
            res.status(403).json('Жанр не найден')
        }
        return res.json(genre)
    }
}
export default new GenreController()
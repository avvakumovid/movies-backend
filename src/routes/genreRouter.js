import {Router} from "express";
import GenreController from '../controller/genreController.js'

const genreRouter = new Router()

genreRouter.get('/genres', GenreController.getAllGenre)
genreRouter.get('/genre/:id', GenreController.getGenreById)

export default genreRouter
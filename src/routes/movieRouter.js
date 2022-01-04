import {Router} from "express";
import MoviesController from '../controller/moviesController.js'

const movieRouter = new Router()

movieRouter.get('/movies', MoviesController.getAllMovies)
movieRouter.get('/movies/count', MoviesController.getMoviesCount)

export default movieRouter
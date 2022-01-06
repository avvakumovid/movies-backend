import {Router} from "express";
import MoviesController from '../controller/moviesController.js'

const movieRouter = new Router()

movieRouter.get('/moviesOld', MoviesController.getAllMovies)
movieRouter.get('/movies/count', MoviesController.getMoviesCount)
movieRouter.get('/movies', MoviesController.getMovies)

export default movieRouter
import {Router} from "express";
import MoviesController from '../controller/moviesController.js'

const movieRouter = new Router()

movieRouter.get('/moviesall', MoviesController.getAllMovies)
movieRouter.get('/movies/count', MoviesController.getMoviesCount)
movieRouter.get('/movies', MoviesController.getMovies)
movieRouter.get('/movie/:id', MoviesController.getMovieById)


export default movieRouter
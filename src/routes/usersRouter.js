import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import UserController from "../controller/userController.js";

const usersRouter = new Router()

usersRouter.get('/users',
    authMiddleware,
    // roleMiddleware('ADMIN'),
    UserController.getAllUsrs)
usersRouter.get('/user/:username', UserController.getUser)
usersRouter.get('/userinfo', authMiddleware, UserController.getUserById)
usersRouter.get('/usermovie', authMiddleware, UserController.getUserWatchlist)
usersRouter.post('/user/role', UserController.addRoleToUser)
usersRouter.post('/user/watchlist', UserController.addMoviesToWatchList)



export default usersRouter
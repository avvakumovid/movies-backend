import {Router} from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import UserController from "../controller/userController.js";

const usersRouter = new Router()

usersRouter.get('/users', authMiddleware, roleMiddleware('ADMIN'), UserController.getAllUsrs)
usersRouter.get('/user/:username', UserController.getUser)
usersRouter.post('/user/role', UserController.addRoleToUser)

export default usersRouter
import jwt from "jsonwebtoken";
import {secret} from "../config/config.js";

export default function (role) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next()
        }
        try {

        } catch (e) {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: 'Пользователь не авторизован'})
            }
            const {roles: userRoles} = jwt.verify(token, secret.key)
            let hasRole = false;
            userRoles.forEach(role => roles.includes(role) ? hasRole = true : null)
            if(!hasRole){
                return res.status(403).json({message: 'У вас нет доступа'})
            }
            next();
        }
    }
}
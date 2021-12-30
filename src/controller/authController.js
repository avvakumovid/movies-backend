import AuthService from '../service/authService.js'

class AuthController {
    async getAllUsrs(req, res) {
        try {
            const users = AuthService.getAllUsers()
            return res.json(users)
        } catch (e) {

        }
    }
}

export default new AuthController()
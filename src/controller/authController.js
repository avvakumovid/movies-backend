class AuthController {
    async getAllUsrs(req, res) {
        try {
            res.json('server work')
        } catch (e) {

        }
    }
}

export default new AuthController()
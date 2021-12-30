import User from "../model/User.js";

class AuthService{
    async getAllUsers(){
        const users = await User.find()
        return users
    }

    async registration(){
        try{
            
        }catch (e) {
            
        }
    }
}

export default new AuthService()
import Role from "../model/Role.js";

class UserService {
    async getRole(value){
        const role = await Role.findOne({value})
        return role

    }
}

export default new UserService()
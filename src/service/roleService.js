import Role from "../model/Role.js";

class RoleService {
    async getRole(value){
        const role = await Role.findOne({value: value})
        return role
    }
}

export default new RoleService()
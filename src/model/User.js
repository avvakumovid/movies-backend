import mongoose from 'mongoose'

const User = new mongoose.Schema({
    username: {type: String, uniqe: true, required: true},
    password: {type: String, required: true},
    roles:{type: String, ref: 'Role'}
})

export default mongoose.model('user', User)
import mongoose from 'mongoose'

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'role'}],
    watchlist: [{type: mongoose.Schema.Types.ObjectId, ref: 'movie', unique: true}]
})

export default mongoose.model('user', User)
import mongoose from "mongoose";

const Genre = new mongoose.Schema({
    id: {type: String, unique: true, required: true},
    name: {type: String, unique: true, required: true},
    img: {type: String, unique: true, required: true},

})

export default mongoose.model('genre', Genre)
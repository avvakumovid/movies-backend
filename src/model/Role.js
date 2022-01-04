import mongoose from "mongoose";

const Role = new mongoose.Schema({
    value: {type: String, unique: true, required: true},
    description: {type: String,  required: true},

})

export default mongoose.model('role', Role)
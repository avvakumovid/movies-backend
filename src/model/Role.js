import mongoose from "mongoose";

const Role = new mongoose.Schema({
    value: {type: String, uniqe: true, require: true},
    description: {type: String,  require: true},

})

export default mongoose.model('role', Role)
import  mongoose from "mongoose";

const Movie = new mongoose.Schema({
    adult: {type: Boolean},
    backdrop_path: {type: String, required: true},
    genre_ids: [{type: Number, ref: 'genre'}],
    id: {type: Number, unique: true, required: true},
    original_language: {type: String, unique: true, required: true},
    original_title: {type: String, unique: true, required: true},
    popularity: {type: String, unique: true, required: true},
    poster_path: {type: String, unique: true, required: true},
    release_date: {type: String, unique: false, required: true},
    title: {type: String, unique: true, required: true},
    video: {type: Boolean, unique: false, required: true},
    vote_average: {type: String, unique: false, required: true},
    vote_count: {type: String, unique: false, required: true},

})

export default mongoose.model('movie', Movie)

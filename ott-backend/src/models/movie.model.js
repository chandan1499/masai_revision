const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cast: [{ type: String, required: true }],
    director: { type: String, required: true },
    release_date: { type: String, required: true },
    rating: { type: Number, required: false, default: 0 },
    genre: { type: String, required: true },
    link: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
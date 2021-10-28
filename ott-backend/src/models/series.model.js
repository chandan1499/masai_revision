const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cast: [{ type: String, required: true }],
    director: { type: String, required: true },
    release_date: { type: String, required: true },
    rating: { type: Number, required: false, default: 0 },
    genre: { type: String, required: true },
    season_count: { type: Number, required: true },
    episode_count: { type: Number, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const Series = mongoose.model("series", seriesSchema);

module.exports = Series;
const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "series",
        required: true,
    },
    season_number: { type: Number, required: true },
    episode_number: { type: Number, required: true },
    link: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
});

const SeriesClips = mongoose.model("seriesClips", seriesSchema);

module.exports = SeriesClips;
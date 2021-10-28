const mongoose = require('mongoose');

const musicSchema = mongoose.Schema({
    name: { type: String, required: true },
    singer: [{ type: String, required: true }],
    director: { type: String, required: true },
    lyricist: { type: String, required: true },
    genre: { type: String, required: true },
    link: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: true
})

const Music = mongoose.model("music", musicSchema);

module.exports = Music;
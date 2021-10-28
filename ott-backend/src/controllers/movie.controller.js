const express = require('express');
const Movie = require('../models/movie.model');
const authentication = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
    try {
        const movies = await Movie.find().lean().exec();

        return res.status(200).json({ movies });
    }
    catch(err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

module.exports = router;
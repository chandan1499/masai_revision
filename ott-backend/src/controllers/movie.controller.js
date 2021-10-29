const express = require('express');
const Movie = require('../models/movie.model');
const authentication = require('../middleware/authenticate');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
    try {
        let page = req.query.page || 1;
        let perPage = req.query.perPage || 10;
        let offset = (page - 1) * perPage;

        if (req.body.user.planType == "guest" && offset > 20) {
            return res.status(200).json({ status: "success", message: "Upgrade to basic or premium plans to see more", user: [] });
        }

        const movies = await Movie.find().skip(offset).limit(perPage).lean().exec();

        let dataCnt = await Movie.find().countDocuments();
        if (req.body.user.planType == "guest") {
            console.log(req.body.user);
            dataCnt = (dataCnt > 20) ? 20 : dataCnt;
        }
        const totalPage = Math.ceil(dataCnt / perPage);

        return res.status(200).json({ movies, totalPage });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.post('/', authentication, async (req, res) => {
    try {
        let payload = {};
        for (key in req.body) {
            if (key != "user") {
                payload[key] = req.body[key];
            }
        }
        const movie = await Movie.create(payload);

        return res.status(201).json({ movie });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.messageF })
    }
})

router.patch("/:id", authentication, async (req, res) => {
    try {
        let payload = {};
        for (key in req.body) {
            if (key != "user") {
                payload[key] = req.body[key];
            }
        }

        const movie = await Movie.findByIdAndUpdate(req.params.id, payload, { new: true });

        return res.status(200).json({ movie: movie })
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message })
    }
})

router.delete("/:id", authentication, async (req, res) => {
    try {
        await Movie.deleteById(req.params.id);

        return res.status(200).json({status: "success"});
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message })
    }
})

module.exports = router;
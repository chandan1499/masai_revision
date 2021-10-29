const express = require('express');
const Music = require('../models/music.model');
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

        const songs = await Music.find().skip(offset).limit(perPage).lean().exec();

        let dataCnt = await Music.find().countDocuments();
        if (req.body.user.planType == "guest") {
            console.log(req.body.user);
            dataCnt = (dataCnt > 20) ? 20 : dataCnt;
        }
        const totalPage = Math.ceil(dataCnt / perPage);

        return res.status(200).json({ songs, totalPage });
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
        const music = await Music.create(payload);

        return res.status(201).json({ music });
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

        const music = await Music.findByIdAndUpdate(req.params.id, payload, { new: true });

        return res.status(200).json({ music })
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message })
    }
})

router.delete("/:id", authentication, async (req, res) => {
    try {
        await Music.deleteById(req.params.id);

        return res.status(200).json({status: "success"});
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message })
    }
})

module.exports = router;
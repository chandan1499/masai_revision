const express = require('express');
const SeriesClips = require('../models/seriesClips.model');
const Series = require('../models/series.model');
const authentication = require('../middleware/authenticate');

const router = express.Router();

router.get('/:id', authentication, async (req, res) => {
    try {
        let season_number = req.query.season_number || 1;

        const clips = await SeriesClips.find({ series_id: req.params.id, season_number: season_number }).lean().exec();

        return res.status(200).json({ clips });
    }
    catch (err) {
        return res.status(404).json({ status: 'failed', message: err.message });
    }
})

router.post('/', authentication, async (req, res) => {
    try {
        const payload = {};
        for (key in req.body) {
            if (key != "user") {
                payload[key] = req.body[key];
            }
        }

        let episode;

        let seriesId = await Series.findById(payload.series_id).lean().exec();

        let season_number = payload?.season_number;
        let episode_number = payload?.episode_number;


        if (season_number < seriesId.season_count) {
            return res.status(400).json({ status: "Failer", message: "Can't add episode in prev seasons" });
        }
        else if (season_number == seriesId.season_count) {
            if (episode_number <= seriesId.episode_count) {
                return res.status(400).json({ status: "Failer", message: "Can't add multiple episodes with same episode count" });
            }
            else if (episode_number - 1 != seriesId.episode_count) {
                return res.status(400).json({ status: "Failer", message: "Some episodes are missing" });
            }

            await Series.findByIdAndUpdate(seriesId._id, { episode_count: episode_number }, { new: true });

            episode = await SeriesClips.create(payload);
        }
        else if (season_number - 1 == seriesId.season_count) {
            if (episode_number != 1) {
                return res.status(400).json({ status: "Failed", message: "Some episodes are missing" });
            }

            await Series.findByIdAndUpdate(seriesId._id, { episode_count: 1, season_count: season_number }, { new: true });

            episode = await SeriesClips.create(payload);
        }

        return res.status(201).json({ episode });
    }
    catch (err) {
        return res.status(404).json({ status: 'failed', message: err.message });
    }
})


module.exports = router;
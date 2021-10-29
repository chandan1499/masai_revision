const express = require('express');
const SeriesClips = require('../models/seriesClips.model');
const authentication = require('../middleware/authenticate');

const router = express.Router();

router.get('/:id', authentication ,async (req, res) => {
    
})
const express = require('express');
const { register, login } = require('./controllers/user.controller');
const movieController = require('./controllers/movie.controller');
const userController = require('./controllers/user.controller').router;
const musicController = require('./controllers/song.controller');
const seriesController = require('./controllers/series.controller');

const app = express();
app.use(express.json());

const connect = require('./configs/db');

app.use('/register', register);
app.use('/login', login);
app.use('/movies', movieController);
app.use('/users', userController);
app.use('/music', musicController);
app.use('/series', seriesController);

const start = async () => {
    await connect();

    app.listen(3001, () => {
        console.log('listeing on port 3001');
    })
}

module.exports = start;
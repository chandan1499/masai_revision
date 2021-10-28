const express = require('express');
const { register, login } = require('./controllers/user.controller');
const movieController = require('./controllers/movie.controller');
const userController = require('./controllers/user.controller').router;

const app = express();
app.use(express.json());

const connect = require('./configs/db');

app.use('/register', register);
app.use('/login', login);
app.use('/movies', movieController);
app.use('/users', userController);

const start = async () => {
    await connect();

    app.listen(3001, () => {
        console.log('listeing on port 3001');
    })
}

module.exports = start;
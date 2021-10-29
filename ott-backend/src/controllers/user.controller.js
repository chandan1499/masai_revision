const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const authentication = require('../middleware/authenticate');

const newToken = (user) => {
    return jwt.sign({ user }, "helloworld");
}

const router = express.Router();

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user) {
            throw new Error("User already exists!");
        }

        user = await User.create(req.body);

        let token = await newToken(user);

        return res.status(201).json({ token });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: req.body.password }).lean().exec();

        if (!user) {
            return res.status(401).json({ status: 'Failed', message: 'Invalid Credentials' });
        }

        let date = new Date();

        if ((+user.planEndDate) < +(date)) {
            user = await User.findByIdAndUpdate(user._id, { planType: "guest" }, { new: true });
        }

        let token = newToken(user);

        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err });
    }
}


router.patch('/', authentication, async (req, res) => {
    try {
        let payload = {};
        for (key in req.body) {
            if (key != "user") {
                payload[key] = req.body[key];
            }
        }

        if (payload.planType) {
            let date = new Date();
            date.setDate(date.getDate() + 30);
            payload.planEndDate = date;
        }

        let user = await User.findByIdAndUpdate(req.body.user._id, payload, { new: true });

        let token = newToken(user);

        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id);

        return res.status(200).json({ user: user });
    }
    catch (err) {
        return res.status(400).json({ status: "failed", message: err.message })
    }
})


module.exports = {
    register,
    login,
    router
}
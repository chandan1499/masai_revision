const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    planType: { type: String, required: false, default: "guest" },
    planEndDate: { type: Date, required: false }
}, {
    versionKey: false,
    timestamps: true
})

const User = mongoose.model('user', userSchema);

module.exports = User;
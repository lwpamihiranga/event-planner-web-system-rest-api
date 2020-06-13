const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    password: { type: String, required: true },
    type: {
        type: String,
        enum: ['User', 'Planner'],
        default: 'User',
        trim: true,
    },
    enrolled_events: [ { type: mongoose.Schema.Types.ObjectId } ],
    created_events: [ {type: mongoose.Schema.Types.ObjectId } ]
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, trim: true },
    date: { type: String },
    isComplete: { type: Boolean, default: false },
    created_by: { type: mongoose.Schema.Types.ObjectId }
});

module.exports = mongoose.model('Event', eventSchema);
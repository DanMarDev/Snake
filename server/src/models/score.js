const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
}, {timestamps: {createdAt: true, updatedAt: false}});

module.exports = mongoose.model('Score', ScoreSchema);
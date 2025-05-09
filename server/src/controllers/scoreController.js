/**
 * @file scoreController.js
 * @description This file contains the controller functions for handling score-related requests.
 * It includes functions to add a score and get user scores.
 * @requires Score
 * @exports addScore
 * @exports getUserScores
 */

const Score = require('../models/score');

exports.addScore = async (req, res) => {
    try {
        const s = new Score({
            userId: req.user.id,
            score: req.body.score,
        });
        await s.save();
        res.status(201).json(s);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getUserScores = async (req, res) => {
    try {
        const scores = await Score
            .find({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(scores);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
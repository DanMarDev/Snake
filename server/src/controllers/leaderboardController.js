/**
 * @file leaderboardController.js
 * @description This file contains the controller function for handling leaderboard-related requests.
 * It includes a function to get the top 10 scores from the database.
 * @requires Score
 * @exports getLeaderboard
 */

const Score = require('../models/score');

exports.getLeaderboard = async (req, res) => {
    try {
        const top = await Score
            .find()
            .sort({ score: -1 })
            .limit(10)
            .populate('email');
        res.json(top);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
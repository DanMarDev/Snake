/**
 * @file auth.js
 * @description This file contains the authentication middleware for the application.
 * It verifies the JWT token sent in the request header and checks if the user exists in the database.
 * If the token is valid, it adds the user information to the request object and calls the next middleware.
 * If the token is invalid or the user does not exist, it sends a 401 Unauthorized response.
 * @requires jsonwebtoken
 * @requires User
 * @exports auth
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Remove 'Bearer ' from the token string
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.user && decoded.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Token is not valid' });
        }
        req.user = await User.findById(userId).select('-password');
        if (!req.user) throw new Error();
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
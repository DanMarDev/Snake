/**
 * @file auth.js
 * @description This file contains the routes for authentication-related requests.
 * It includes routes for user registration and login.
 * @requires express
 * @requires authController
 * @exports router
 */

const router = require('express').Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
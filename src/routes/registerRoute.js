const express = require('express');
const validateUser = require('../middlewares/validateUser');
const registerUser = require('../controllers/registerController');

const registerRoute = express.Router();

registerRoute.post('/register', validateUser, registerUser);

module.exports = registerRoute;

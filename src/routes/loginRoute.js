const express = require('express');
const validateUser = require('../middlewares/validateUser');
const loginUser = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/login', validateUser, loginUser);

module.exports = loginRoute;

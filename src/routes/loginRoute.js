const express = require('express');
const { validateUser } = require('../middlewares/validateData');
const loginUser = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/login', validateUser, loginUser);

module.exports = loginRoute;

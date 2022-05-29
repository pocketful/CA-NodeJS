const express = require('express');
const getAccounts = require('../controllers/accountsController');

const accountsRoute = express.Router();

accountsRoute.get('/accounts', getAccounts);

module.exports = accountsRoute;

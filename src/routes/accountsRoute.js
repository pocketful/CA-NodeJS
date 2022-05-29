const express = require('express');
const controller = require('../controllers/accountsController');
const validateToken = require('../middlewares/validateToken');

const accountsRoute = express.Router();

accountsRoute.get('/accounts', controller.getAccounts);
accountsRoute.post('/accounts', validateToken, controller.postAccounts);

module.exports = accountsRoute;

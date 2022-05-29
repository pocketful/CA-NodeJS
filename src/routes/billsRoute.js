const express = require('express');
const getBills = require('../controllers/billsController');

const billsRoute = express.Router();

billsRoute.get('/bills', getBills);

module.exports = billsRoute;

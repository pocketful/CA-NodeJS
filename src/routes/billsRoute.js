const express = require('express');
const controller = require('../controllers/billsController');

const billsRoute = express.Router();

billsRoute.get('/bills', controller.getBills);
billsRoute.post('/bills', controller.postBills);

module.exports = billsRoute;

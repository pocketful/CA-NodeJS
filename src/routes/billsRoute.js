const express = require('express');
const controller = require('../controllers/billsController');
const validateBills = require('../middlewares/validateData');

const billsRoute = express.Router();

billsRoute.get('/bills/:groupId', controller.getBillsByGroupId);
billsRoute.post('/bills', validateBills, controller.postBills);

module.exports = billsRoute;

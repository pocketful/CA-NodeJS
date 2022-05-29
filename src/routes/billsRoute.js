const express = require('express');
const { validateBill } = require('../middlewares/validateData');
const controller = require('../controllers/billsController');

const billsRoute = express.Router();

billsRoute.get('/bills/:groupId', controller.getBillsByGroupId);
billsRoute.post('/bills', validateBill, controller.postBills);

module.exports = billsRoute;

const express = require('express');
const validateToken = require('../middlewares/validateToken');
const controller = require('../controllers/groupsController');

const groupsRoute = express.Router();

groupsRoute.get('/groups', validateToken, controller.getGroups);
groupsRoute.post('/groups', validateToken, controller.postGroups);

module.exports = groupsRoute;

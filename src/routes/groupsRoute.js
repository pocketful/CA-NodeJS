const express = require('express');
const validateToken = require('../middlewares/validateToken');
const controller = require('../controllers/groupsController');
const { validateGroup } = require('../middlewares/validateData');

const groupsRoute = express.Router();

groupsRoute.get('/groups', validateToken, controller.getNotAssignedGroups);
groupsRoute.post('/groups', validateToken, validateGroup, controller.postGroups);

module.exports = groupsRoute;

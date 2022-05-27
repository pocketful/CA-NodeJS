const express = require('express');
const validateToken = require('../middlewares/validateToken');
const getGroups = require('../controllers/groupsController');

const groupsRoute = express.Router();

groupsRoute.get('/groups', validateToken, getGroups);

module.exports = groupsRoute;

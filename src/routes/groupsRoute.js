const express = require('express');
const getGroups = require('../controllers/groupsController');
const validateToken = require('../middlewares/validateToken');

const groupsRoute = express.Router();

groupsRoute.get('/groups', validateToken, getGroups);

module.exports = groupsRoute;

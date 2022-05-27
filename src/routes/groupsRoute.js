const express = require('express');
const getGroups = require('../controllers/groupsController');

const groupsRoute = express.Router();

groupsRoute.get('/groups', getGroups);

module.exports = groupsRoute;

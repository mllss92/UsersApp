const express = require('express');
const route = express.Router();

const controller = require('../components/shared/controllers/users');

module.exports = () => {

  route.post('/get-users', controller.getUsers);

  return route
}
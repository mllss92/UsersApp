const Router = require('express').Router;

const auth = require('./auth');
const users = require('./users');

module.exports = () => {
  const routing = Router();

  routing.use('/auth', auth());
  routing.use('/users', users());

  return routing
}
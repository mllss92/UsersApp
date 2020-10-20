const express = require('express');
const route = express.Router();
const passport = require('passport');

const controller = require('../components/shared/controllers/users');

module.exports = () => {

  route.post('/get-users', passport.authenticate('jwt', { session: false }), controller.getUsers);
  route.post('/create-user', passport.authenticate('jwt', { session: false }), controller.createUser);
  route.post('/get-access-right', passport.authenticate('jwt', { session: false }), controller.getAccessRight);
  route.get('/get-info-about-user/:id', passport.authenticate('jwt', { session: false }), controller.getInfoAboutUser);
  route.post('/get-info-about-self', passport.authenticate('jwt', { session: false }), controller.getInfoAboutSelf);
  route.post('/edit-user', passport.authenticate('jwt', { session: false }), controller.editUser);
  route.delete('/delete-user/:id', passport.authenticate('jwt', { session: false }), controller.deleteUser);

  return route
}
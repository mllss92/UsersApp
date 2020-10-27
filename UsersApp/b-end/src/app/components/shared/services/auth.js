const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./../models/users');
const jwtConfig = require('./../../../../config/jwt');

const tryLogin = async (authData) => {
  const isUser = await Users.findOne({ email: authData.email });

  if (isUser) {
    const isSame = bcrypt.compareSync(authData.password, isUser.password);
    if (isSame) {
      const token = jwt.sign({
        email: isUser.email,
        id: isUser.id
      }, jwtConfig.key, jwtConfig.config);
      return {
        userData: {
          name: isUser.name,
          email: isUser.email,
          id: isUser.id
        },
        isLogin: true,
        token: `Bearer ${token}`
      }
    } else {
      return Promise.reject({ message: 'The password you have entered is invalid!', statusType: 401 })
    }
  } else {
    return Promise.reject({ message: 'User with this e-mail address does not exist!', statusType: 404 })
  }
}


module.exports = {
  tryLogin
}
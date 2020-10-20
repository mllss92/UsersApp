const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtConfig = require('./../../../../config/jwt');
const User = require('./../models/users');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtConfig.key
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, cb) => {
      try {
        const user = await User.findOne({ id: payload.id }).select('email id');

        if (user) {
          cb(null, user);
        } else {
          cb(null, false);
        }
      } catch (error) {
        return error
      }
    })
  )
}
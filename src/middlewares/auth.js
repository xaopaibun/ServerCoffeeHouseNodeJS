const passport = require('passport');
const httpStatus = require('http-status');
const FacebookTokenStrategy = require('passport-facebook-token');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

const { userService } = require('../services');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');
const { facebookClientId, facebookClientSecret, googleClientId, googleClientSecret } = require('../config/config');

// passport.use(
//   new FacebookTokenStrategy(
//     {
//       clientID: facebookClientId,
//       clientSecret: facebookClientSecret,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await userService.getUserByIdFaceBook(profile.id);
//         if (user) return done(null, user);
//         const newUser = await userService.createUser({
//           facebook: {
//             uid: profile.id,
//             token: accessToken,
//             email: profile.emails[0].value,
//           },
//           name: profile.displayName,
//         });
//         return done(null, newUser);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

// passport.use(
//   new GooglePlusTokenStrategy(
//     {
//       clientID: googleClientId,
//       clientSecret: googleClientSecret,
//       passReqToCallback: true,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         const user = await userService.getUserByIdGoogle(profile.id);
//         if (user) return done(null, user);
//         const newUser = await userService.createUser({
//           google: {
//             uid: profile.id,
//             token: accessToken,
//             email: profile.emails[0].value,
//           },
//           fullname: profile.displayName,
//         });
//         return done(null, newUser);
//       } catch (error) {
//         return done(error, false);
//       }
//     }
//   )
// );

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;

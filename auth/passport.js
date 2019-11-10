var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var models = require("../models");
const encrypt = require("../services/text-encrypt");

exports.setup = function() {
  passport.use('local-admin',
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password" // this is the virtual field on the model
      },
      function(email, password, done) {
        models.User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          if (!user) {
            return done(null, false, {
              message: "This email is not registered."
            });
          }
          if (!user.active) {
            return done(null, false, {
              message: "Your account not active."
            });
          }

          if (
            user.role == "admin" ||
            user.role == "master"
          ) {
            if (!encrypt.userAuthenticate(password, user.password, user.salt)) {
              return done(null, false, {
                message: "This password is not correct."
              });
            }
            return done(null, user);
          } else {
            return done(null, false, {
              message: "You don't have permission for login."
            });
          }
        });
      }
    )
  );

  passport.use('local-user',
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password" // this is the virtual field on the model
      },
      function(email, password, done) {
        email = email.toLowerCase();
        models.User.findOne({
          where: {
            email: email
          }
        }).then(user => {
          if (!user) {
            return done(null, false, {
              message: "This email is not registered."
            });
          }
          if (!user.active) {
            return done(null, false, {
              message: "Your account not active."
            });
          }

          if (
            user.role == "admin" ||
            user.role == "master" || user.role == "user"
          ) {
            if (!encrypt.userAuthenticate(password, user.password, user.salt)) {
              return done(null, false, {
                message: "This password is not correct."
              });
            }
            return done(null, user);
          } else {
            return done(null, false, {
              message: "You don't have permission for login."
            });
          }
        });
      }
    )
  );
};

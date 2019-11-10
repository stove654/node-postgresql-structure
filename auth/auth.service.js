"use strict";

var config = require("../config/config-env");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");
var compose = require("composable-middleware");
var validateJwt = expressJwt({ secret: config.secret });
var models = require("../models");

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty("access_token")) {
          req.headers.authorization = "Bearer " + req.query.access_token;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        if (!req.user) {
          return res.status(401).json({
            success: false
          });
        }

        models.User.findOne({
          where: {
            id: req.user.id
          }
        }).then(user => {
          if (!user) {
            return res.status(401).json({
              success: false
            });
          }
          req.user = user;
          next();
        });
      })
  );
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) throw new Error("Required role needs to be set");
  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      let index = roleRequired.findIndex(role => {
        return role == req.user.role;
      });
      if (index !== -1) {
        next();
      } else {
        res.status(403);
      }
      // if (
      //   config.roles.indexOf(req.user.role) >=
      //   config.roles.indexOf(roleRequired)
      // ) {
      //   next();
      // } else {
      //   res.send(403);
      // }
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
function signToken(id, days) {
  if (!days) days = 7;
  return jwt.sign({ id: id }, config.secret, {
    expiresIn: 60 * 60 * 24 * days
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
function setTokenCookie(req, res) {
  if (!req.user)
    return res.status(404).json({
      message: "Something went wrong, please try again."
    });
  var token = signToken(req.user.id, req.user.role);
  res.cookie("token", JSON.stringify(token));
  res.redirect("/");
}

exports.isAuthenticated = isAuthenticated;
exports.hasRole = hasRole;
exports.signToken = signToken;
exports.setTokenCookie = setTokenCookie;

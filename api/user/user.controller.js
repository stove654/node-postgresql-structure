"use strict";

var models  = require('../models');

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  models.User.findAll().then(function(users) {
    res.status(200).json(users);
  });
};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect("/");
};

function handleError(res, err) {
  return res.status(500).json(err);
}

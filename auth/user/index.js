"use strict";

var express = require("express");
var passport = require("passport");
var auth = require("../auth.service");

var router = express.Router();

router.post("/", function(req, res, next) {
  passport.authenticate("local-user", function(err, user, info) {
    var error = err || info;
    if (error)
      return res.status(401).json({
        success: false,
        message: error.message
      });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Authentication failed. Wrong password."
      });

    var token = auth.signToken(user.id, 365 * 2);

    res.status(200).json({
      success: true,
      message: "Enjoy your token!",
      token: token,
      user: user
    });
  })(req, res, next);
});

module.exports = router;

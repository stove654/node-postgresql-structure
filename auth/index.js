"use strict";

var express = require("express");
var User = require("../api/user/user.model");
var passport = require("passport");
require("./local/passport").setup(User);

var router = express.Router();
router.use("/local", require("./local"));

module.exports = router;

"use strict";

var models = require("../../models");
var encrypt = require("../../services/text-encrypt");
var auth = require("../../auth/auth.service");

const config = require("../../config/config-env");
var Sequelize = require('sequelize');

/**
 * Get list of users
 * restriction: 'admin'
 */
// exports.index = function(req, res) {
//   models.User.findAll().then(function(users) {
//     res.status(200).json(users);
//   });
// };

exports.createAccount = function(req, res, next) {
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((doc) => {
    if (doc) {
      return res.status(422).json({
        message: "Email already used."
      });
    }
    let salt = encrypt.makeSalt();
    let payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encrypt.encryptPassword(req.body.password, salt),
      salt: salt,
      role: 'admin'
    }
    if (req.body.active) {
      payload.active = req.body.active
    }

    models.User.create(payload).then(function(user) {
      delete user.dataValues.password
      delete user.dataValues.salt
      return res.status(200).json(user.dataValues);
    }).catch(next)
  }).catch(next)
};


exports.createUser = function(req, res, next) {
  req.body.email = req.body.email.toLowerCase()
  if (req.body.password.length < 6) {
    res.status(400).json({
      success: false,
      message: "Password needs at least 6 characters."
    });
    return
  }
  models.User.findOne({
    where: {
      email: req.body.email
    }
  }).then((doc) => {
    if (doc) {
      return res.status(422).json({
        message: "Email already used."
      });
    }
    let salt = encrypt.makeSalt();
    
    let payload = {
      firstName: req.body.firstName,
      email: req.body.email,
      password: encrypt.encryptPassword(req.body.password, salt),
      salt: salt,
      role: 'user',
      active: true,
      lastName: req.body.lastName || "",
      source: req.body.source
    }

    models.User.create(payload).then(function(user) {
      delete user.dataValues.password
      delete user.dataValues.salt
      var token = auth.signToken(user.dataValues.id, 365 * 2);
      res.status(200).json({
        success: true,
        message: "Enjoy your token!",
        token: token,
        user: user.dataValues,
      });
      
      return
    }).catch(next)
  }).catch(next)
};

exports.getListUsers = (req, res, next) => {
  let limit = 100;   // number of records per page
  let offset = 0
  models.User.count()
  .then((data) => {
    let page = req.query.page || 1;      // page number
    let pages = Math.ceil(data / limit);
    offset = limit * (page - 1);
    let params = {
      attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt', 'active', 'email', 'avatar', 'role', 'plan'],
      limit: limit,
      order: [['updatedAt', 'DESC']],
      offset: offset
    }

    if (req.query.textSearch) {
      params.where = {
        email: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('email')), 'LIKE', '%' + req.query.textSearch.toLowerCase() + '%')
      }
    }
    models.User.findAll(params)
    .then((users) => {
      res.status(200).json({'result': users, 'count': data, 'pages': pages});
    });
  })
  .catch(next);
}

exports.getProfile = function(req, res, next) {
  models.User.findOne({
    where: {
      id: req.user.id
    }
  }).then((doc) => {
    doc = JSON.parse(JSON.stringify(doc));
    if (doc) {
      delete doc.password;
      delete doc.salt;
      res.status(200).json(doc);
    } else {
      return res.status(400)
    }
  }).catch(next)
};

exports.getUser = function(req, res, next) {
  models.User.findOne({
    where: {
      id: req.params.id
    }
  }).then((doc) => {
    if (doc) {
      doc = JSON.parse(JSON.stringify(doc));
      delete doc.password;
      delete doc.salt;
      return res.status(200).json(doc);
    } else {
      return res.status(400)
    }
  }).catch(next)
};

exports.updateUser = function(req, res, next) {
  if (req.body.password) {
    let salt = encrypt.makeSalt();
    let password = encrypt.encryptPassword(req.body.password, salt);
    req.body.password = password;
    req.body.salt = salt;
  }
  models.User.update(
    req.body,
    {where: {
      id: req.params.id
    }}
  )
  .then(function(doc) {
    return res.status(200).json(doc);
  }).catch(next)
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

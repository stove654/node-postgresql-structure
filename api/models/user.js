'use strict';
module.exports = (sequelize, DataTypes) => {
  
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    hashPassword: DataTypes.STRING
  });

  User.sync({ force: true });

  return User;
};
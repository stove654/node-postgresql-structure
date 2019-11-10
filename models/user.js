'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: true,
        notEmpty: true
    },
    salt: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true
    },
    source: DataTypes.STRING
  }, {
    indexes: [
      {
          unique: true,
          fields: ['email']
      }
  ]
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: Sequelize.STRING,
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 8
        }
      },
      email: {
        type: Sequelize.STRING,
          allowNull: false,
          validate: {
            isEmail: true
          },
          unique: true,
          notEmpty: true
      },
      salt: Sequelize.STRING,
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true 
      },
      avatar: {
        type: Sequelize.STRING,
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    let payload = {
      firstName: "Master",
      lastName: "Boss",
      email: "master@stove.com",
      password: "x8HsUwir7i1sL4+VBWBKzSvuI3tOeEHGGh/MEQfgXoWR7CRCbk566C7Xvx+KLKFgxT8Q07JuMlrPKtsXDsQl+g==",
      salt: "J9ajrw8Two3bvl1FT32Gcg==",
      active: true,
      role: "master",
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: "https://wrappixel.com/ampleadmin/assets/images/users/1.jpg"
    }
   
    return queryInterface.bulkInsert('Users', [payload])

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

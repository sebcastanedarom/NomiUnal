'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      queryInterface.renameColumn('roles','tipo_rol','cargo_rol');
    */
  },

  down: (queryInterface, Sequelize) => {
    /*
      queryInterface.renameColumn('roles','cargo_rol','tipo_rol');
      sequelize db:migrate
    */
  }
};

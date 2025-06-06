'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      sbd: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      toan: Sequelize.FLOAT,
      van: Sequelize.FLOAT,
      ngoaiNgu: Sequelize.FLOAT,
      ly: Sequelize.FLOAT,
      hoa: Sequelize.FLOAT,
      sinh: Sequelize.FLOAT,
      su: Sequelize.FLOAT,
      dia: Sequelize.FLOAT,
      gdcd: Sequelize.FLOAT,
      maNgoaiNgu: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Students');
  }
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Companies',
          key: 'id'
        },
        allowNull: false
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reward: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      detail: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      skill: {
        type: Sequelize.STRING,
        allowNull: false
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notices');
  }
};

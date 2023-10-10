'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    static associate(models) {
      this.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });

      this.belongsToMany(models.User, {
        through: models.Apply,
        foreignKey: 'noticeId',
        as: 'users'
      });
    }
  }
  Notice.init({
    position: DataTypes.STRING,
    reward: DataTypes.INTEGER,
    detail: DataTypes.TEXT,
    skill: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Notice',
  });
  return Notice;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      this.belongsTo(models.Notice, {
        foreignKey: 'noticeId',
        as: 'notice'
      });
    }
  }
  Apply.init({
    userId: DataTypes.INTEGER,
    noticeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Apply',
  });
  return Apply;
};

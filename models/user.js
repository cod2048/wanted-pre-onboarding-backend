'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // N:M 관계 설정
      this.belongsToMany(models.Notice, {
        through: models.Apply,
        foreignKey: 'userId',
        as: 'notices'
      });
    }
  }
  User.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

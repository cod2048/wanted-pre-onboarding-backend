'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      this.hasMany(models.Notice, {
        foreignKey: 'companyId',
        as: 'notices'
      });
    }
  }
  Company.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};

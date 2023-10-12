'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      //채용공고와 관계설정
      this.hasMany(models.Notice, {
        foreignKey: 'companyId',
        as: 'notices'
      });
    }
  }
  Company.init({
    id: {
      //회사가 직접 id를 입력하도록 함
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};

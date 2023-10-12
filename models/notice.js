'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notice extends Model {
    static associate(models) {
      //회사와 관계설정
      this.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company'
      });
      //user와 관계설정
      this.belongsToMany(models.User, {
        through: models.Apply,
        foreignKey: 'noticeId',
        as: 'users'
      });
    }
  }

  Notice.init({
    companyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id'
      },
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reward: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    skill: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Notice',
  });


  return Notice;
};

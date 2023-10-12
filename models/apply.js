'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apply extends Model {
    static associate(models) {
      //user와 관계 설정
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      //채용공고와 관계 설정
      this.belongsTo(models.Notice, {
        foreignKey: 'noticeId',
        as: 'notice'
      });
    }
  }
  Apply.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    noticeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Notices',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Apply',
  });
  return Apply;
};

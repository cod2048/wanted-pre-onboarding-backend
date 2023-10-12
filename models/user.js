'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // 채용공고와 관계설정
      this.belongsToMany(models.Notice, {
        through: models.Apply,
        foreignKey: 'userId',
        as: 'notices'
      });
    }
  }
  User.init({
    id: {
      //user가 직접 id를 입력하도록 함
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};

const { DataTypes } = require('sequelize');
const  Role  = require('../enums/enums');


module.exports = (sequelize) => {

 return sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {msg: 'Por favor escriba un email válido'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      values: Object.values(Role),
      defaultValue: Role.USER
    },
    isAcepted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: null
    }
  });
};
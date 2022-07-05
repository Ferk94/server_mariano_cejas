const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  return sequelize.define('Enterprise', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    logo: {
      type: DataTypes.STRING(160000),
      allowNull: false
      
    }
  });
};
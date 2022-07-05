const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

 return sequelize.define('Excursion', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  });
}; 
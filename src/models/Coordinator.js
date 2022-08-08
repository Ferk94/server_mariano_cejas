const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

 return sequelize.define('Coordinator', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    dropboxCel: {
      type: DataTypes.STRING(16000),
      allowNull: false,
    },
    dropboxPc: {
      type: DataTypes.STRING(16000),
      allowNull: false,
    }
  });
}; 
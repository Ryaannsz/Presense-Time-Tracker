const sequelize = require('sequelize')

const dbConnection = require('./db')

const Data = dbConnection.define("login", {
    id: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: sequelize.DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: sequelize.DataTypes.TEXT,
        allowNull: false
    },
    vefLogin:{
        type: sequelize.DataTypes.BOOLEAN,
        defaultValue: false
    }
})



Data.sync()
Data.associate = (models) => {
    Data.hasMany(models.saveLogin, { foreignKey: 'UserId' });
  };




module.exports = Data

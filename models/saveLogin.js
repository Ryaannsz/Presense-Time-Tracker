const sequelize = require('sequelize')
const Data = require('./users')
const dbConnection = require('./db')


const saveLogin = dbConnection.define("registro",{
    id_login: {
        type: sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserId: {
        type: sequelize.DataTypes.INTEGER,
        references: {
            model: Data, 
            key: 'id'    
        }
    },
   entrada: {
    type: sequelize.DataTypes.DATE,
    allowNull: false
   },
   saida: {
    type: sequelize.DataTypes.DATE,
    allowNull: true
   }
})

saveLogin.sync()
saveLogin.associate = (models) => {
    saveLogin.belongsTo(models.Data, { foreignKey: 'UserId' });
  };
module.exports = saveLogin
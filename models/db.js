const sequelize = require('sequelize')

const connection = new sequelize("cadastro", "root", "1234",{
    host: 'localhost',
    dialect: 'mysql'
})

if(connection.authenticate()){
    console.log("Banco de dados conectado com sucesso!");
}else{
    console.log("Falha na conexão do banco de dados!")
}


module.exports=connection
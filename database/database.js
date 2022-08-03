const Sequelize = require('sequelize');

const connection = new Sequelize('plataformaperguntas', 'root', '', { //Ultimo espaço colocar senha
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta', { // Variavel = Chamo minha conexão e faço uma definição (nome da minha tabela)
    titulo:{ //Nome do campo
        type: Sequelize.STRING, //Definindo o campo da minha tabela, string texto curto
        allowNull: false, //Não permite valor nulo nesse campo
    },
    descricao:{
        type: Sequelize.TEXT, //TEXT são texto longos
        
    }

});

Pergunta.sync({force: false}).then(() => {
    console.log("Tabela criada com sucesso!")
});  //Ele sincroniza com o banco de dados e cria minha tabela, o false significa que se já existir ele não vai recriar a tabela

module.exports = Pergunta;
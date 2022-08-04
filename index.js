const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

//DATABASE
connection.authenticate().then(() => {
    console.log("Conexão feita com o banco de dados");
}).catch((msgErro) => {
    console.log(msgErro);
});

app.set('view engine', 'ejs'); //Eu to dizendo para o express usar o EJS como engine(motor)
app.use(express.static('public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false})); //Esse comando aqui vai decodificar os dados usados pelo formulario
app.use(bodyParser.json()); //Permite ler dados de formulario enviados via JSON

//ROTAS
app.get("/", function (req, res) {
    Pergunta.findAll({raw: true, order: [
        ['id','DESC'] //Coloquei um Array no order para ordenar minhas perguntas pelo ID de forma Decrescente 
    ]}).then(perguntas => { //raw é para fazer uma pesquisa crua, trazendo só os dados necessarios!
        res.render("index", {
            perguntas: perguntas
        }); //Quando uso render, ele automaticamente pega o arquivo da pasta views
    });    
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar"); //Para ele renderizar a view perguntar
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;

    //PARA TESTAR SE O FORMULARIO PURO ESTÁ FUNCIONANDO USE:
    //res.send("Formulário recebido! titulo" + titulo + " " + " descricao " + descricao);

    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/"); 
    }); //Se tudo ocorreu com sucesso, quero redirecionar o usuario para a pagina principal
});

app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){//pergunta achada

            Resposta.findAll({
                where: {perguntaId : pergunta.id},
                order: [['id', 'DESC']] //Pesquisando respostas que tenham pergunta id igual o id da pagina
            }).then(respostas => { //Campo que recebe um Array com todas as perguntas
                res.render("pergunta", {
                    pergunta: pergunta, //Estou mandano a pergunta encontrada para minha View!
                    respostas: respostas
                });
            });
        }
        else{ //Pergunta não encotrada!
            res.redirect("/");
        }
    });
});
app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.perguntaId;

    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId) //Estou redirecionando a pagina da pergunta 
    });
});

app.listen(8080, () => {
    console.log("App rodando");
});
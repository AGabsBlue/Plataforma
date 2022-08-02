const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs'); //Eu to dizendo para o express usar o EJS como engine(motor)
app.use(express.static('public'));

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false})) //Esse comando aqui vai decodificar os dados usados pelo formulario
app.use(bodyParser.json()); //Permite ler dados de formulario enviados via JSON

//ROTAS
app.get("/", function (req, res) {
    
    res.render("index"); //Quando uso render, ele automaticamente pega o arquivo da pasta views
       
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar"); //Para ele renderizar a view perguntar
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    res.send("Formulário recebido! titulo" + titulo + " " + " descricao " + descricao);
});

app.listen(8080, () => {
    console.log("App rodando");
});
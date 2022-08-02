const express = require("express");
const app = express();

app.set('view engine', 'ejs'); //Eu to dizendo para o express usar o EJS como engine(motor)
app.use(express.static('public'));

app.get("/", function (req, res) {
    
    res.render("index"); //Quando uso render, ele automaticamente pega o arquivo da pasta views
       
});

app.listen(8080, () => {
    console.log("App rodando");
});
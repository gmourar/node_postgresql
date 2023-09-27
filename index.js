require("dotenv").config(); // biblioteca que procura o env na raiz do projeto e salva na memoria

const port = process.env.PORT; // ter acesso ao port 
const express = require("express"); // pegar a biblioteca express
const app = express();
const db =  require("./database");



app.get("/" , (req, res ) =>{
    res.json({
        message: "funcionando"
    }) // objeto js que responde em json
})   // primerio parametro é o caminho. Segundo é a funcao que será executada ao ser chamada a requisicao

app.get("/cliente/:id" , async (req, res) =>{
    const cliente = await db.selectCostumer(req.params.id);
    res.json(cliente); // trazer resultado da query em formato json
})

app.get("/clientes" , async (req, res) =>{
    const clientes = await db.selectCostumers();
    res.json(clientes); // trazer resultado da query em formato json
})

app.listen(port); // inicializar
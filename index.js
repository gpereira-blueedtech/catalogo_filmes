require('dotenv').config()
const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

// Fazendo a conexão com o banco e recebendo o modelo do Sequelize
const Filme = require("./models/filme");

const message = "";

app.get("/", async (req, res) => {
    const filmes = await Filme.findAll();
    res.render("index", {
      filmes, message
    });
});


app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
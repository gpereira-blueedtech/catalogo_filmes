const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor
const path = require("path");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const message = "";
const filmes = [
    {
        "id": 1,
        "nome": "Harry Potter e a Pedra Filosofal",
        "descricao": "O filme do Harry Potter",
        "imagem": "https://ingresso-a.akamaihd.net/img/cinema/cartaz/7766-cartaz.jpg"
    },
    {
        "id": 2,
        "nome": "Senhor dos Anéis: As Duas Torres",
        "descricao": "O filme do Sr. Dos Anéis",
        "imagem": "https://i.pinimg.com/originals/e5/e8/cf/e5e8cfc267a11c8ae6ba728b4537543f.jpg"
    }
]

app.get("/", (req, res) => {
  res.render("index", {
    filmes, message
  });
});


app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
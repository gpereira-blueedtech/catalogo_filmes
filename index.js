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

var message = "";

app.get("/", async (req, res) => {
    const filmes = await Filme.findAll();

    setTimeout(() => {
      message = ""
    }, 1000)

    res.render("index", {
      filmes, message
    });
});

// Rota para procurar os detalhes de um filme baseado no seu ID (PK)
app.get("/filmes/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);
  res.render("detalhes", {
    filme,
  });
});


app.get("/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      filme,
      message: "Filme não encontrado!",
    });
  } 
  res.render("deletar", {
    filme, message
  });
});

app.post("/deletar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("deletar", {
      filme, message: "Filme não encontrado!",
    });
  }

  await filme.destroy();

  message = `Filme ${filme.nome} deletado com sucesso!`

  res.redirect("/");
});


app.get("/criar", (req, res) => {
  res.render("criar", {
    message
  });
});

app.get("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  if (!filme) {
    res.render("editar", {
      mensagem: "Filme não encontrado!",
    });
  }

  res.render("editar", {
    filme, message
  });
});

app.post("/editar/:id", async (req, res) => {
  const filme = await Filme.findByPk(req.params.id);

  const { nome, descricao, imagem } = req.body;

  filme.nome = nome;
  filme.descricao = descricao;
  filme.imagem = imagem;

  const filmeEditado = await filme.save();

  res.render("editar", {
    filme: filmeEditado,
    message: "Filme editado com sucesso!",
  });
});

app.post("/criar", async (req, res) => {
  const { nome, descricao, imagem } = req.body;

  if (!nome) {
    res.render("criar", {
      message: "Nome é obrigatório",
    });
  }

  else if (!imagem) {
    res.render("criar", {
      message: "Imagem é obrigatório",
    });
  }

  else {
    try {
      const filme = await Filme.create({
        nome,
        descricao,
        imagem,
      });

      res.render("criar", {
        filme, message: "Seu filme foi cadastrado!"
      });
    } catch (err) {
      console.log(err);

      res.render("criar", {
        message: "Ocorreu um erro ao cadastrar o Filme!",
      });
    }
  }
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`))
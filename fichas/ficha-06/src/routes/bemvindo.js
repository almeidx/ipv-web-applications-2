const { Router } = require("express");
const log = require("../middleware/log.js");

const bemVindoRouter = Router();

bemVindoRouter.get("/bemvindo", log, (req, res) => {
  const { nome } = req.query;

  if (nome) {
    res.send(`Bem-vindo, ${nome}!`);
  } else {
    res.send("Bem-vindo!");
  }
});

module.exports = bemVindoRouter;

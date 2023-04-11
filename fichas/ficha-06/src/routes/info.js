const { Router } = require("express");
const log = require("../middleware/log.js");

const infoRouter = Router();

infoRouter.get("/info", log, (req, res) => {
  console.log("Início da execução da rota info…");

  res.send("Rota info executada com sucesso…");
});

module.exports = infoRouter;

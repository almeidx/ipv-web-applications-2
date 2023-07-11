const { Router } = require("express");
const { genero_list } = require("../controllers/generos.controller.js");

const generosRouter = Router().get("/list", genero_list);

module.exports = generosRouter;

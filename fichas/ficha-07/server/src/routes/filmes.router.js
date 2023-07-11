const { Router } = require("express");
const {
  filme_create,
  filme_detail,
  filme_list,
  filme_update,
} = require("../controllers/filmes.controller.js");

const filmesRouter = Router();

filmesRouter
  .get("/list", filme_list)
  .get("/get/:id", filme_detail)
  .post("/create", filme_create)
  .put("/update/:id", filme_update);

module.exports = filmesRouter;

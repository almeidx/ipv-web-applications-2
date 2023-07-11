const sequelize = require("./connection.js");
const express = require("express");
const cors = require("cors");
const filmesRouter = require("./routes/filmes.router.js");
const generosRouter = require("./routes/generos.router.js");
const Filme = require("./model/Filme.js");
const Genero = require("./model/Genero.js");

Filme.hasOne(Genero, {
  foreignKey: "id",
  sourceKey: "genero",
  as: "generoRel",
});
Genero.hasMany(Filme, {
  foreignKey: "genero",
  sourceKey: "id",
  as: "filmesRel",
});

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(
    cors({
      origin: "http://localhost:3000",
    }),
  )
  .use("/filme", filmesRouter)
  .use("/genero", generosRouter);

(async () => {
  await sequelize.authenticate();

  await sequelize.sync();

  const port = process.env.PORT || 3333;

  app.listen(port, () =>
    console.log(`Server listening to http://localhost:${port}`),
  );
})();

const express = require("express");

const infoRouter = require("./routes/info.js");
const bemVindoRouter = require("./routes/bemvindo.js");
const somaRouter = require("./routes/soma.js");

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(infoRouter);
app.use(bemVindoRouter);
app.use(somaRouter);

const port = app.get("port");

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

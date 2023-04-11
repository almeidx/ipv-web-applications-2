const { Router } = require("express");
const log = require("../middleware/log.js");

const somaRouter = Router();

somaRouter.post("/soma", log, (req, res) => {
  const { valor1, valor2 } = req.body;

  if (!valor1 || !valor2) {
    res.status(400).send("Os valores devem ser passados.");
    return;
  }

  const n1 = Number.parseFloat(valor1);
  const n2 = Number.parseFloat(valor2);

  if (Number.isNaN(n1) || Number.isNaN(n2)) {
    res.status(400).send("Os valores devem ser numéricos.");
    return;
  }

  res.json({ valor1: n1, valor2: n2, resultado: n1 + n2 });
});

module.exports = somaRouter;

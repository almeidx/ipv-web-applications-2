const Genero = require("../model/Genero.js");

module.exports = {
  async genero_list(_req, res) {
    res.json(
      await Genero.findAll({
        order: [["descricao", "ASC"]],
      }),
    );
  },
};

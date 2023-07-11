const Filme = require("../model/Filme.js");
const Genero = require("../model/Genero.js");

module.exports = {
  async filme_create(req, res) {
    const { titulo, descricao, foto, genero } = req.body;

    if (!titulo || !descricao || !foto || typeof genero !== "number") {
      res.status(400).json({ error: "Dados inválidos" });
      return;
    }

    const filme = await Filme.create({
      titulo,
      descricao,
      foto,
      genero,
    });

    const filmeComGenero = await Filme.findByPk(filme.id, {
      include: [
        {
          model: Genero,
          as: "generoRel",
        },
      ],
    });

    res.status(201).json(filmeComGenero);
  },

  async filme_list(_req, res) {
    res.json(
      await Filme.findAll({
        include: [
          {
            model: Genero,
            as: "generoRel",
          },
        ],
        order: [["id", "ASC"]],
      }),
    );
  },

  async filme_detail(req, res) {
    const { id } = req.params;

    const filme = await Filme.findByPk(id, {
      include: [
        {
          model: Genero,
          as: "generoRel",
        },
      ],
    });

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    res.json(filme);
  },

  async filme_update(req, res) {
    const { id } = req.params;
    const { titulo, descricao, foto, genero } = req.body;

    const filme = await Filme.findByPk(id);

    if (!filme) {
      return res.status(404).json({ error: "Filme não encontrado" });
    }

    const update = {};

    if (titulo && titulo !== filme.titulo) update.titulo = titulo;
    if (descricao && descricao !== filme.descricao)
      update.descricao = descricao;
    if (foto && foto !== filme.foto) update.foto = foto;
    if (typeof genero === "number" && genero !== filme.genero)
      update.genero = genero;

    await filme.update(update);

    res.json(filme);
  },
};

const Categoria = require("../models/categoria");

exports.listar = async (req, res) => {
  const categorias = await Categoria.listar();
  res.render("categorias", { categorias });
};

exports.criar = async (req, res) => {
  const { nome, slug, emoji } = req.body;
  await Categoria.criar({ nome, slug, emoji });
  res.redirect("/categorias");
};
const Produto = require("../models/produto");

exports.listar = async (req, res) => {
  const produtos = await Produto.listar();
  res.render("produtos", { produtos });
};

exports.criar = async (req, res) => {
  const { categoria_id, nome, descricao, preco, emoji } = req.body;
  await Produto.criar({ categoria_id, nome, descricao, preco, emoji });
  res.redirect("/produtos");
};
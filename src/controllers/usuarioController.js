const Usuario = require("../models/usuario");

exports.listar = async (req, res) => {
  const usuarios = await Usuario.listar();
  res.render("usuarios", { usuarios });
};

exports.criar = async (req, res) => {
  const { nome, email, telefone, senha } = req.body;
  await Usuario.criar({ nome, email, telefone, senha });
  res.redirect("/usuarios");
};
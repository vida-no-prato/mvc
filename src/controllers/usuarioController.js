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

exports.mostrar = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send('ID do usuário é obrigatório');
  const usuario = await Usuario.buscarPorId(id);
  if (!usuario) return res.status(404).render('404', { title: 'Usuário não encontrado', message: 'Usuário não encontrado' });
  res.render('usuario', { usuario, title: 'Meu Perfil' });
};
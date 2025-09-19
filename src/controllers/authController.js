const { criarUsuario, buscarPorEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  const { nome, email, telefone, senha } = req.body;
  if (!nome || !email || !telefone || !senha) {
    return res.status(400).send('Preencha todos os campos');
  }
  const existente = await buscarPorEmail(email);
  if (existente) return res.status(400).send('Email já cadastrado');
  const id = await criarUsuario(nome, email, telefone, senha);
  res.json({ id, nome, email, telefone });
}

async function login(req, res) {
  const { email, senha } = req.body;
  const usuario = await buscarPorEmail(email);
  if (!usuario) return res.status(401).send('Usuário não encontrado');
  const valido = await bcrypt.compare(senha, usuario.senha);
  if (!valido) return res.status(401).send('Senha incorreta');
  res.json({ mensagem: 'Login ok', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
}

module.exports = { register, login };

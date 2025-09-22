const express = require('express');
const router = express.Router();
const { criarUsuario, buscarPorEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  const existente = await buscarPorEmail(email);
  if (existente) {
    return res.status(400).send('Email já cadastrado');
  }
  const id = await criarUsuario(nome, email, senha);
  res.status(201).json({ id, nome, email });
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await buscarPorEmail(email);
  if (!usuario) return res.status(401).send('Usuário não encontrado');

  const valido = await bcrypt.compare(senha, usuario.senha);
  if (!valido) return res.status(401).send('Senha incorreta');

  res.json({ mensagem: 'Login ok', usuario: { id: usuario.id, nome: usuario.nome } });
});

module.exports = router;
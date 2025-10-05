const express = require('express');
const router = express.Router();
// O nome da função no seu model é 'criar', vamos corrigir isso aqui
const Usuario = require('../models/usuario'); 
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  // Receber o telefone do corpo da requisição
  const { nome, email, telefone, senha } = req.body; // MODIFICADO
  if (!nome || !email || !senha) {
    return res.status(400).json({ success: false, message: 'Nome, email e senha são obrigatórios' });
  }
  const existente = await Usuario.buscarPorEmail(email);
  if (existente) {
    return res.status(400).json({ success: false, message: 'Email já cadastrado' });
  }
  try {
    // Passar o telefone para a função de criação
    const id = await Usuario.criar({ nome, email, telefone, senha }); // MODIFICADO
    res.status(201).json({ success: true, message: 'Cadastro realizado com sucesso!', usuario: { id, nome, email } });
  } catch (error) {
    console.error('Erro no registro:', error); // Adiciona um log para depuração
    res.status(500).json({ success: false, message: 'Erro interno ao criar usuário.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.buscarPorEmail(email);
  if (!usuario) return res.status(401).json({ success: false, message: 'Usuário não encontrado' });

  const valido = await bcrypt.compare(senha, usuario.senha);
  if (!valido) return res.status(401).json({ success: false, message: 'Senha incorreta' });

  res.json({ success: true, message: 'Login bem-sucedido!', usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email } });
});

module.exports = router;
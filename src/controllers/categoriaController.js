const Categoria = require("../models/categoria");

exports.listar = async (req, res) => {
  const categorias = await Categoria.listar();
  res.json(categorias);
   console.log(req.body);
};

exports.criar = async (req, res) => {
  console.log(req.body);
  const { nome, chave, emoji, descricao } = req.body;
  await Categoria.criar({ nome, chave, emoji, descricao });
  res.json({ success: true });
};

exports.editar = async (req, res) => {
  const { id } = req.params;
  const { nome, chave, emoji, descricao } = req.body;
  await Categoria.editar(id, { nome, chave, emoji, descricao });
  res.json({ success: true });
};

exports.excluir = async (req, res) => {
  const { id } = req.params;
  const force = req.query && req.query.force === 'true';
  try {
    if (force) {
      // Forçar exclusão com cascade
      await Categoria.excluirComProdutos(id);
    } else {
      const hasProducts = await Categoria.temProdutos(id);
      if (hasProducts) {
        return res.status(400).json({ success: false, message: 'Não é possível excluir a categoria: existem produtos associados.' });
      }
      await Categoria.excluir(id);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao excluir categoria:', err);
    res.status(500).json({ success: false, message: 'Erro ao excluir categoria.' });
  }
};
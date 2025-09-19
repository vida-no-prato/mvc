const { listarCategorias } = require('../models/categoryModel');

async function getCategorias(req, res) {
  const categorias = await listarCategorias();
  res.json(categorias);
}

module.exports = { getCategorias };
const { listarProdutos } = require('../models/productModel');

async function getProdutos(req, res) {
  const produtos = await listarProdutos();
  res.json(produtos);
}

module.exports = { getProdutos };
const Produto = require("../models/produto");

exports.listar = async (req, res) => {
  const produtos = await Produto.listar();
  res.json(produtos);
};

exports.criar = async (req, res) => {
  const { categoria_id, nome, descricao, preco, emoji } = req.body;
  
  // Pega o nome do arquivo de req.file se um upload foi feito
  const imagem = req.file ? req.file.filename : null;

  await Produto.criar({ categoria_id, nome, descricao, preco, emoji, imagem });
  res.json({ success: true });
};

exports.editar = async (req, res) => {
  const { id } = req.params;
  const { categoria_id, nome, descricao, preco, emoji, imagem_existente } = req.body;

  // Se um novo arquivo foi enviado, usa o novo nome. Senão, mantém o antigo.
  const imagem = req.file ? req.file.filename : imagem_existente;

  await Produto.editar(id, { categoria_id, nome, descricao, preco, emoji, imagem });
  res.json({ success: true });
};

exports.excluir = async (req, res) => {
  const { id } = req.params;
  const force = req.query && req.query.force === 'true';
  try {
    if (force) {
      await Produto.excluirComItens(id);
    } else {
      await Produto.excluir(id);
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Erro ao excluir produto:', err);
    // MySQL foreign key constraint error (cannot delete or update a parent row)
    if (err && (err.code === 'ER_ROW_IS_REFERENCED_2' || err.errno === 1451)) {
      return res.status(400).json({ success: false, message: 'Não é possível excluir este produto: existe(m) pedido(s) que o referenciam.' });
    }
    res.status(500).json({ success: false, message: 'Erro ao excluir produto.' });
  }
};